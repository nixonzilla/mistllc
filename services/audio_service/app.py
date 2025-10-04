import io
import base64
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import numpy as np
import librosa
from mutagen import File as MutagenFile
from pydub import AudioSegment
import matplotlib.pyplot as plt

app = FastAPI(title="MISTLLC audio_service", version="1.0")


@app.post("/analyze")
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
                    metadata = {str(k): str(v) for k, v in meta.tags}
        except Exception:
            metadata = {}

        # Create small waveform PNG (base64)
        try:
            plt.switch_backend("Agg")
            fig, ax = plt.subplots(figsize=(8, 2))
            # normalize to -1..1 for display
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
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/health")
async def health_check():
    return {"status": "ok"}
    