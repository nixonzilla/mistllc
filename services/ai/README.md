# ai_recommender

POST /recommend { track_id, top_n } -> { recommendations: [ids...] }

This service expects a `features.json` file with `ids` and numeric `features`.
For production, replace the static file with a DB or vector store.
