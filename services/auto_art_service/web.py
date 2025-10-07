# services/auto_art_service/web.py
import os
from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from pydantic import BaseModel
from redis import Redis
from rq import Queue
from dotenv import load_dotenv
from typing import Dict
from services.common.api_key import require_api_key  # adjust import path if needed
from tasks import generate_art_task

load_dotenv()

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")  # docker-compose service name 'redis'
redis_conn = Redis.from_url(REDIS_URL)
queue = Queue("art", connection=redis_conn)

app = FastAPI(title="MISTLLC auto_art_service (web)")

class GenerateRequest(BaseModel):
    prompt: str
    width: int = 1024
    height: int = 1024

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/generate", dependencies=[Depends(require_api_key)])
def generate(req: GenerateRequest):
    """
    Enqueue an art generation job. Returns job id. Worker will process and set result.
    """
    # enqueue task
    job = queue.enqueue(generate_art_task, req.prompt, req.width, req.height, job_timeout=60*5)
    return {"job_id": job.get_id(), "status": "queued"}
@app.get("/result/{job_id}", dependencies=[Depends(require_api_key)])
def get_result(job_id: str):
    """
    Check job status and get result if completed.
    """
    try:
        job = queue.fetch_job(job_id)
        if not job:
            raise HTTPException(status_code=404, detail="Job not found")
        if job.is_finished:
            return {"status": "finished", "result": job.result}
        elif job.is_queued:
            return {"status": "queued"}
        elif job.is_started:
            return {"status": "in progress"}
        elif job.is_failed:
            return {"status": "failed", "error": str(job.exc_info)}
        else:
            return {"status": "unknown"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")