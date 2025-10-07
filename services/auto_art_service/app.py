import os
import time
from typing import List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN")

app = FastAPI(title="MISTLLC auto_art_service")

if not REPLICATE_API_TOKEN:
    # The service will still start — but generation calls will fail with descriptive message
    app.state.replicate_configured = False
else:
    app.state.replicate_configured = True
    client = httpx.Client(base_url="https://api.replicate.com/v1",
                          headers={"Authorization": f"Token {REPLICATE_API_TOKEN}"})


class PromptRequest(BaseModel):
    prompt: str
    width: int = 1024
    height: int = 1024


@app.post("/generate")
async def generate_art(req: PromptRequest):
    if not app.state.replicate_configured:
        raise HTTPException(status_code=500, detail="Replicate API token not configured. Set REPLICATE_API_TOKEN in env.")

    # NOTE: You must replace 'model_version' with a valid model version ID from Replicate
    model_payload = {
        "version": os.getenv("REPLICATE_MODEL_VERSION", ""),  # provide via env for production
        "input": {
            "prompt": req.prompt,
            "width": req.width,
            "height": req.height
        }
    }
    if not model_payload["version"]:
        raise HTTPException(status_code=500, detail="REPLICATE_MODEL_VERSION not set")

    r = client.post("/predictions", json=model_payload)
    if r.status_code not in (200, 201):
        raise HTTPException(status_code=500, detail=f"Replicate request failed: {r.text}")

    job = r.json()
    job_id = job.get("id")
    # Poll for completion (simple approach)
    for _ in range(60):
        pr = client.get(f"/predictions/{job_id}")
        if pr.status_code != 200:
            time.sleep(1)
            continue
        obj = pr.json()
        status = obj.get("status")
        if status == "succeeded":
            return {"images": obj.get("output", [])}
        if status == "failed":
            raise HTTPException(status_code=500, detail="Image generation failed")
        time.sleep(1)
    raise HTTPException(status_code=504, detail="Generation timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")