# Backend Dockerfile
FROM node:20 AS builder
WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy source
COPY backend/ ./

# Build with TypeScript
RUN npm run build

# Runtime image
FROM node:20 AS stage-1
WORKDIR /app

# Install production dependencies
COPY backend/package*.json ./
RUN npm install --only=production


# Copy built worker
COPY --from=builder /app/dist ./dist
COPY --from=stage-1 /app/node_modules ./node_modules

# Environment vars (can be overridden in Actions/Compose)
ENV NODE_ENV=production

CMD ["dev", "--local"]
