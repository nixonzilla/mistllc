# ---- Frontend build stage ----
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package.json + lockfile
COPY frontend/package*.json ./
RUN npm install --frozen-lockfile

# Copy frontend source and build
COPY frontend/ .
RUN npm run build


# ---- Backend build stage ----
FROM node:20-alpine AS backend-build

WORKDIR /app/backend

# Copy backend package.json + lockfile
COPY backend/package*.json ./
RUN npm install --frozen-lockfile

# Copy backend source
COPY backend/ .

# Copy built frontend into backend's public folder (served by Express/Nest/etc.)
COPY --from=frontend-build /app/frontend/dist ./public

# Build backend if using TypeScript
RUN npm run build


# ---- Production runtime ----
FROM node:20-alpine AS production

WORKDIR /app

# Copy only the built backend + node_modules
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/package*.json ./backend/

# Expose backend port
EXPOSE 3000

# Start backend
CMD ["node", "backend/dist/index.js"]
