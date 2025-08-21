# Backend Dockerfile
FROM node:24 AS builder
WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy source
COPY backend/ ./

# Build with TypeScript
RUN npm run build

# Runtime image
FROM node:24
WORKDIR /app

# Wrangler for running locally or CI
RUN npm install -g wrangler

# Copy built worker
COPY --from=builder /app/dist ./dist
COPY .backend/wrangler.toml ./

# Environment vars (can be overridden in Actions/Compose)
ENV NODE_ENV=production

CMD ["wrangler", "dev", "--local"]
