# ---- Base Node image ----
FROM node:20 AS base
WORKDIR /app

# ---- Frontend build ----
FROM base AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

# ---- Backend build ----
FROM base AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
# Copy frontend build output into backend (if serving static files)
COPY --from=frontend-build /app/frontend/dist ./public
RUN npm run build

# ---- Runtime image ----
FROM node:20-slim AS runtime
WORKDIR /app

# Copy only production deps
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend build + public files
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/public ./public

EXPOSE 3000
CMD ["node", "dist/index.js"]
