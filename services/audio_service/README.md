# audio_service

POST /analyze

- body: multipart/form-data `file` field
- returns: JSON with { duration, sample_rate, estimated_bpm, metadata, waveform_png_base64 }

Run locally:
docker build -t mist_audio_service .
docker run -p 8001:8001 mist_audio_service
