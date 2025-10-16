from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import numpy as np
from recommender import SimpleRecommender
from typing import List

app = FastAPI(title="MISTLLC recommender")

# Load a precomputed features file (features.json) in the same folder.
# This file should contain {"ids": [...], "features":[[...], ...]}
try:
    with open("features.json", "r", encoding="utf-8") as f:
        _data = json.load(f)
    ids = _data.get("ids", [])
    features = np.array(_data.get("features", []), dtype=float)
    recommender = SimpleRecommender(features, ids)
except Exception:
    ids = []
    features = np.zeros((0, 0))
    recommender = SimpleRecommender(features, ids)

class RecommendRequest(BaseModel):
    track_id: str
    top_n: int = 5

@app.post("/recommend")
async def recommend(req: RecommendRequest):
    if not ids.any() and len(ids) == 0:
        # still return empty gracefully
        return {"recommendations": []}
    recs = recommender.recommend(req.track_id, top_n=req.top_n)
    return {"recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load features: {e}")