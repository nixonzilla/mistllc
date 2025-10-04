import io
import json
import sqlite3
from typing import Dict
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
import pandas as pd
import matplotlib.pyplot as plt
from pydantic import BaseModel

DB = "analytics.db"
app = FastAPI(title="MISTLLC analytics")

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

@app.post("/event")
async def ingest_event(event: EventIn):
    conn = sqlite3.connect(DB)
    cur = conn.cursor()
    cur.execute("INSERT INTO events (event_type, entity_id, properties) VALUES (?, ?, ?)",
                (event.event_type, event.entity_id, json.dumps(event.properties)))
    conn.commit()
    conn.close()
    return {"ok": True}

@app.get("/report/top-tracks.png")
async def top_tracks_png():
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
        plt.close(fig)
        return StreamingResponse(buf, media_type="image/png")

    plt.switch_backend("Agg")
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.bar(df['entity_id'].astype(str), df['plays'])
    ax.set_xlabel("Track ID")
    ax.set_ylabel("Plays")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=100)
    buf.seek(0)
    plt.close(fig)
    return StreamingResponse(buf, media_type="image/png")

@app.get("/events")
async def list_events(limit: int = 100):
    conn = sqlite3.connect(DB)
    df = pd.read_sql_query("SELECT id, event_type, entity_id, properties, ts FROM events ORDER BY ts DESC LIMIT ?", conn, params=(limit,))
    conn.close()
    return JSONResponse(content=json.loads(df.to_json(orient="records")))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal error: {e}")
@app.get("/health")
async def health_check():
    return {"status": "ok"}