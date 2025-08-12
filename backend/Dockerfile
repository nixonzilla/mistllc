# Stage 1 - Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json tsconfig.json ./
RUN npm ci --only=production && npm install typescript

# Copy source
COPY src ./src

# Build TS -> JS
RUN npx tsc

# Stage 2 - Production runtime
FROM node:20-alpine
WORKDIR /app

# Copy package.json for runtime deps
COPY package*.json ./
RUN npm ci --only=production

# Copy compiled JS
COPY --from=builder /app/dist ./dist

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost:5000/health || exit 1

# Expose port
EXPOSE 5000

# Start
CMD ["node", "dist/index.js"]
