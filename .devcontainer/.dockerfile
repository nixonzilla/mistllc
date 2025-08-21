# ========================
# Stage 1: Build backend worker
# ========================
FROM node:24 AS builder

WORKDIR /app

# Copy backend package + tsconfig
COPY backend/package*.json ./
COPY backend/tsconfig.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/src ./src

# Build TypeScript
RUN npm run build

# ========================
# Stage 2: Runtime container
# ========================
FROM node:24 AS stage-1

WORKDIR /app

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Copy wrangler.toml (must be in repo root)
COPY wrangler.toml ./wrangler.toml

# Default environment variables
ENV NODE_ENV=production

# Expose Cloudflare worker dev port (for local testing)
EXPOSE 8787

# Command (overridden by wrangler normally)
CMD ["npx", "wrangler", "dev", "--local", "--port", "8787"]
