# services/auto_art_service/tasks.py
import os
import time
from redis import Redis
from rq import get_current_job
import httpx
from dotenv import load_dotenv

load_dotenv()

REPLICATE_API_TOKEN = os.getenv("REPLICATE_API_TOKEN", "")
REPLICATE_MODEL_VERSION = os.getenv("REPLICATE_MODEL_VERSION", "")

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

def generate_art_task(prompt: str, width: int = 1024, height: int = 1024):
    """
    Worker task: call model provider (Replicate or placeholder).
    Returns list of image URLs or base64 strings.
    """
    job = get_current_job()
    # Example: if replicate properly configured, call replicate (here we use httpx to call an API)
    if not REPLICATE_API_TOKEN or not REPLICATE_MODEL_VERSION:
        # In case of misconfiguration, return a placeholder image or raise
        # Return a placeholder response to avoid worker failure
        return {"error": "replicate not configured", "images": []}

    headers = {"Authorization": f"Token {REPLICATE_API_TOKEN}", "Content-Type": "application/json"}
    payload = {
        "version": REPLICATE_MODEL_VERSION,
        "input": {"prompt": prompt, "width": width, "height": height}
    }

    with httpx.Client(timeout=120.0) as client:
        r = client.post("https://api.replicate.com/v1/predictions", json=payload, headers=headers)
        r.raise_for_status()
        job_data = r.json()
        job_id = job_data.get("id")

        # Poll until finished (simple, bounded polling)
        for _ in range(60):
            res = client.get(f"https://api.replicate.com/v1/predictions/{job_id}", headers=headers)
            res.raise_for_status()
            obj = res.json()
            status = obj.get("status")
            if status == "succeeded":
                out = obj.get("output", []) or []
                # result might be list of URLs
                return {"images": out}
            if status == "failed":
                return {"error": "generation failed", "images": []}
            time.sleep(1)

    return {"error": "timeout", "images": []}
# services/analytics/app.py
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from pydantic import BaseModel
from typing import Dict
import sqlite3
import pandas as pd
import matplotlib.pyplot as plt
import io
import json
import os
import time
import logging
import asyncio
import aiosqlite
import datetime
import random
import string
import contextlib
import threading
import functools
import queue
import base64
import math
import tempfile
import shutil
import uvicorn
import seaborn as sns
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
import plotly.subplots as sp
import matplotlib.dates as mdates
import matplotlib.ticker as ticker
import matplotlib
import matplotlib.animation as animation
import matplotlib.cm as cm
import matplotlib.colors as mcolors
import matplotlib.patches as mpatches
import matplotlib.path as mpath
import matplotlib.gridspec as gridspec
import matplotlib.font_manager as font_manager
import matplotlib.backends.backend_agg as backend_agg
import matplotlib.backends.backend_pdf as backend_pdf
import matplotlib.backends.backend_svg as backend_svg
import matplotlib.backends.backend_tkagg as backend_tkagg
import matplotlib.backends.backend_cairo as backend_cairo
import matplotlib.backends.backend_wxagg as backend_wxagg
import matplotlib.backends.backend_ps as backend_ps
import matplotlib.backends.backend_nbagg as backend_nbagg
import matplotlib.backends.backend_webagg as backend_webagg
import matplotlib.backends.backend_qt5agg as backend_qt5agg
import matplotlib.backends.backend_qt4agg as backend_qt4agg
import matplotlib.backends.backend_gtk3agg as backend_gtk3agg
import matplotlib.backends.backend_gtkagg as backend_gtkagg