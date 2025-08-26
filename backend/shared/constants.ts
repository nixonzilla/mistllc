// shared/constants.ts

// Centralized constants for frontend + backend
export const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://mistllc-backend.jacobnixon59.workers.dev/" 
    : "http://127.0.0.1:8787"; 
