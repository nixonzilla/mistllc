# ====== Base stage (install dependencies) ======
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies (shared for frontend/backend if monorepo)
COPY package*.json ./
RUN npm install --frozen-lockfile

# ====== Frontend build stage ======
FROM base AS frontend-builder
WORKDIR /app/frontend
COPY frontend/ ./
RUN npm install && npm run build

# ====== Backend stage ======
FROM base AS backend-builder
WORKDIR /app/backend
COPY backend/ ./
COPY --from=frontend-builder /app/frontend/dist ./public
RUN npm install

# ====== Final minimal image ======
FROM node:20-alpine AS final
WORKDIR /app
ENV NODE_ENV=production

# Copy backend
COPY --from=backend-builder /app/backend ./

# Expose app port (change if different)
EXPOSE 3000

# Start the backend server
CMD ["node", "index.js"]