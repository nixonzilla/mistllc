# services/common/api_key.py
from fastapi import Header, HTTPException, Security, Request
from fastapi.security.api_key import APIKeyHeader
import os
from typing import Optional

# header name clients must send
API_KEY_HEADER_NAME = "x-api-key"
api_key_header = APIKeyHeader(name=API_KEY_HEADER_NAME, auto_error=False)

def get_expected_api_key() -> Optional[str]:
    # prefer specific service key, fallback to a generic key
    return os.getenv("SERVICE_API_KEY") or os.getenv("GLOBAL_API_KEY")

async def require_api_key(header_value: str = Security(api_key_header)):
    """
    Use as a dependency in endpoints:
      @app.post("/foo", dependencies=[Depends(require_api_key)])
    or as a parameter:
      async def endpoint(api_key: str = Depends(require_api_key)):
          ...
    """
    expected = get_expected_api_key()
    if not expected:
        # If no API key configured, deny by default in production; for dev you may set env var
        raise HTTPException(status_code=401, detail="Service API key not configured")
    if not header_value or header_value != expected:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True


# Optional middleware version (applies to every request)
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

class APIKeyMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, header_name: str = API_KEY_HEADER_NAME):
        super().__init__(app)
        self.header_name = header_name
        self.expected = get_expected_api_key()

    async def dispatch(self, request: Request, call_next):
        # allow open routes like /health
        if request.url.path in ("/health", "/"):
            return await call_next(request)

        if not self.expected:
            return JSONResponse({"detail": "Service API key not configured"}, status_code=401)

        key = request.headers.get(self.header_name)
        if key != self.expected:
            return JSONResponse({"detail": "Invalid API key"}, status_code=401)
        return await call_next(request)
# To use middleware, add to FastAPI app:
# app.add_middleware(APIKeyMiddleware)
# Example usage in endpoint:
# @app.post("/some-protected-endpoint", dependencies=[Depends(require_api_key)])
# or
# async def endpoint(api_key: str = Depends(require_api_key)):
#     ...
# --- IGNORE ---
import io
import json
import sqlite3
from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import pandas as pd
import matplotlib.pyplot as plt
from pydantic import BaseModel
from services.common.api_key import require_api_key, APIKeyMiddleware
import os
DB = "analytics.db"
app = FastAPI(title="MISTLLC analytics")
# Add API key middleware
app.add_middleware(APIKeyMiddleware)
# Initialize DB if needed
def init_db():
    conn = sqlite3.connect(DB)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        entity_id TEXT,
        properties TEXT,
        ts DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()
    conn.close()
init_db()
class EventIn(BaseModel):
    event_type: str
    entity_id: str = ""
    properties: Dict = {}
@app.post("/event", dependencies=[require_api_key])
async def ingest_event(event: EventIn):
    try:
        conn = sqlite3.connect(DB)
        cur = conn.cursor()
        cur.execute("INSERT INTO events (event_type, entity_id, properties) VALUES (?, ?, ?)",
                    (event.event_type, event.entity_id, json.dumps(event.properties)))
        conn.commit()
        conn.close()
        return {"ok": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
@app.get("/report/top-tracks.png", dependencies=[require_api_key])
async def top_tracks_png():
    try:
        conn = sqlite3.connect(DB)
        df = pd.read_sql_query(
            "SELECT entity_id, COUNT(*) as plays FROM events WHERE event_type='play' GROUP BY entity_id ORDER BY plays DESC LIMIT 10",
            conn
        )
        conn.close()
        if df.empty:
            # return small blank PNG to avoid client errors
            fig = plt.figure(figsize=(4, 2))
            buf = io.BytesIO()
            plt.text(0.5, 0.5, "No data", ha="center", va="center")
            fig.savefig(buf, format="png", dpi=80, bbox_inches="tight")
            buf.seek(0)
            return StreamingResponse(buf, media_type="image/png")
        fig, ax = plt.subplots(figsize=(8, 4))
        ax.barh(df['entity_id'], df['plays'], color='skyblue')
        ax.set_xlabel('Plays')
        ax.set_title('Top 10 Tracks by Plays')
        plt.tight_layout()
        buf = io.BytesIO()
        fig.savefig(buf, format="png", dpi=100)
        buf.seek(0)
        return StreamingResponse(buf, media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
@app.get("/events", dependencies=[require_api_key])
async def get_events(limit: int = 100):
    try:
        conn = sqlite3.connect(DB)
        df = pd.read_sql_query("SELECT id, event_type, entity_id, properties, ts FROM events ORDER BY ts DESC LIMIT ?", conn, params=(limit,))
        conn.close()
        return JSONResponse(content=json.loads(df.to_json(orient="records")))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
@app.get("/health")
async def health_check():
    return {"status": "ok"}
    return {"status": "ok"}
# --- IGNORE ---
import io
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel  
import numpy as np
from recommender import SimpleRecommender
from typing import List
from services.common.api_key import require_api_key, APIKeyMiddleware
import os
app = FastAPI(title="MISTLLC recommender")
# Add API key middleware
app.add_middleware(APIKeyMiddleware)
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
@app.post("/recommend", dependencies=[require_api_key])
async def recommend(req: RecommendRequest):
    try:
        if not ids.any() and len(ids) == 0:
            # still return empty gracefully
            return {"recommendations": []}
        recs = recommender.recommend(req.track_id, top_n=req.top_n)
        return {"recommendations": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load features: {e}")
@app.get("/health")
async def health_check():
    return {"status": "ok"}
    return {"status": "ok"} 
# --- IGNORE ----
import io
import base64
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from services.common.api_key import require_api_key, APIKeyMiddleware
import numpy as np
import librosa
from mutagen import File as MutagenFile
from pydub import AudioSegment
import matplotlib.pyplot as plt
app = FastAPI(title="MISTLLC audio_service", version="1.0")
# Add API key middleware
app.add_middleware(APIKeyMiddleware)
@app.post("/analyze", dependencies=[require_api_key])
async def analyze_audio(file: UploadFile = File(...), filename: Optional[str] = Form(None)):
    """
    Accepts an audio file upload. Returns duration, sample rate, estimated bpm,
    metadata (if available) and a base64 encoded waveform PNG.
    """
    try:
        content = await file.read()
        audio_bytes = io.BytesIO(content)

        # Duration: prefer pydub (reliable for many formats)
        try:
            pyd = AudioSegment.from_file(audio_bytes)
            duration_s = round(pyd.duration_seconds, 2)
        except Exception:
            # fallback: librosa
            try:
                y_tmp, sr_tmp = librosa.load(io.BytesIO(content), sr=None)
                duration_s = round(len(y_tmp) / sr_tmp, 2)
            except Exception:
                duration_s = 0.0

        # Load with librosa for analysis
        try:
            y, sr = librosa.load(io.BytesIO(content), sr=None, mono=True)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not decode audio: {e}")

        # estimate tempo (BPM)
        try:
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            tempo = round(float(tempo), 2)
        except Exception:
            tempo = 0.0

        # Basic metadata via mutagen
        metadata = {}
        try:
            meta = MutagenFile(io.BytesIO(content))
            if meta and getattr(meta, "tags", None):
                # tags sometimes not dict-like; handle gracefully
                if hasattr(meta.tags, "items"):
                    for k, v in meta.tags.items():
                        metadata[str(k)] = str(v)
                else:
                    metadata = {str(k): str(v) for k, v in meta
                        .items()}
        except Exception:
            metadata = {}
        # Generate waveform plot
        try:
            plt.switch_backend("Agg")
            fig, ax = plt.subplots(figsize=(8, 2))
            if y.size > 0:
                ax.plot(np.linspace(0, duration_s or 1, num=len(y)), y, linewidth=0.4)
            ax.axis("off")
            buf = io.BytesIO()
            plt.tight_layout(pad=0)
            fig.savefig(buf, format="png", dpi=80, bbox_inches="tight", pad_inches=0)
            plt.close(fig)
            buf.seek(0)
            waveform_b64 = base64.b64encode(buf.read()).decode("ascii")
        except Exception:
            waveform_b64 = ""
        return JSONResponse({
            "duration": duration_s,
            "sample_rate": int(sr) if sr else None,
            "estimated_bpm": tempo,
            "metadata": metadata,
            "waveform_png_base64": waveform_b64,
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/health")
async def health_check():
    return {"status": "ok"} 
    return {"status": "ok"}