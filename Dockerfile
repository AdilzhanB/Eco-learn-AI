# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm ci --only=production && npm cache clean --force

# Install server dependencies
WORKDIR /app/server
RUN npm ci --only=production && npm cache clean --force

# Build frontend
FROM base AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Build server
FROM base AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server/ .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 ecotracker

# Copy built applications
COPY --from=frontend-builder --chown=ecotracker:nodejs /app/frontend/dist ./frontend/dist
COPY --from=server-builder --chown=ecotracker:nodejs /app/server/dist ./server/dist
COPY --from=deps --chown=ecotracker:nodejs /app/server/node_modules ./server/node_modules

# Copy configuration files
COPY --chown=ecotracker:nodejs server/package.json ./server/
COPY --chown=ecotracker:nodejs docker-entrypoint.sh ./

# Make entrypoint executable
RUN chmod +x docker-entrypoint.sh

# Switch to non-root user
USER ecotracker

# Expose ports
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
ENTRYPOINT ["./docker-entrypoint.sh"]
