# ----------------------
# Base image
# ----------------------
FROM node:20-alpine AS base
WORKDIR /app

# ----------------------
# Frontend Builder
# ----------------------
FROM base AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ----------------------
# Backend Builder
# ----------------------
FROM base AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# ----------------------
# Production Runtime
# ----------------------
FROM node:20-alpine AS production
WORKDIR /app

# Copy frontend dist into backend/public
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules

# Default command (prod backend)
WORKDIR /app/backend
CMD ["node", "dist/index.js"]

# ----------------------
# Development Runtime
# ----------------------
FROM base AS development
WORKDIR /app

# Install frontend & backend deps
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy sources
COPY frontend ./frontend
COPY backend ./backend

# Default command (dev mode with hot reload)
CMD ["sh", "-c", "cd backend && npx ts-node-dev --respawn src/index.ts"]
