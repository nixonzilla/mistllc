# auto_art_service

This service wraps a model provider (example: Replicate). Requires:

- REPLICATE_API_TOKEN env variable
- REPLICATE_MODEL_VERSION env variable (model version ID)

POST /generate { prompt, width, height } -> polls model and returns image URLs when done.
