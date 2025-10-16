from typing import List
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class SimpleRecommender:
    def __init__(self, feature_matrix: np.ndarray, ids: List[str]):
        self.features = feature_matrix  # shape (n, d)
        self.ids = ids

    def recommend(self, track_id: str, top_n: int = 5):
        if track_id not in self.ids:
            return []
        idx = self.ids.index(track_id)
        vec = self.features[idx:idx+1]
        sims = cosine_similarity(vec, self.features)[0]
        order = np.argsort(-sims)
        recs = [self.ids[i] for i in order if i != idx][:top_n]
        return recs
# Example usage:
# features = np.random.rand(100, 20)  # 100 items with 20-dim features
# ids = [f"track_{i}" for i in range(100)]
# recommender = SimpleRecommender(features, ids).items()}
# print(recommender.recommend("track_0", top_n=5)).items()}
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
        })            raise HTTPException(status_code=500, detail=f"Internal error: {e}")
        