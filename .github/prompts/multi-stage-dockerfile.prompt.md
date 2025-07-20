---
mode: 'agent'
description: 'Create optimized multi-stage Dockerfiles for efficient containerization with minimal image size and security best practices'
tools: ['changes', 'codebase', 'editFiles', 'search']
---

# Create Multi-Stage Dockerfile

Create an optimized multi-stage Dockerfile that follows best practices for containerization, security, and performance. The Dockerfile should minimize image size, improve build times, and enhance security.

## Primary Objective

Generate a production-ready multi-stage Dockerfile that efficiently builds and packages applications while maintaining security, performance, and maintainability standards.

## Analysis Phase

### Application Assessment
1. **Technology Stack**: Identify runtime requirements and dependencies
2. **Build Process**: Understand compilation, bundling, and asset generation steps
3. **Runtime Needs**: Determine minimum requirements for production execution
4. **Security Requirements**: Identify security constraints and compliance needs
5. **Performance Goals**: Define image size and startup time targets

### Architecture Planning
1. **Stage Definition**: Plan build, test, and runtime stages
2. **Base Image Selection**: Choose appropriate base images for each stage
3. **Dependency Management**: Optimize dependency installation and caching
4. **Asset Optimization**: Plan for static asset handling and optimization
5. **Security Hardening**: Implement security best practices

## Multi-Stage Dockerfile Structure

### Stage 1: Dependencies
```dockerfile
# Stage 1: Install dependencies
FROM node:18-alpine AS dependencies

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies with cache optimization
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production --silent

# Install dev dependencies in separate layer for build stage
FROM node:18-alpine AS dev-dependencies
WORKDIR /app
COPY package*.json ./
COPY yarn.lock* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --silent
```

### Stage 2: Build
```dockerfile
# Stage 2: Build application
FROM dev-dependencies AS builder

# Copy source code
COPY . .

# Build application
RUN npm run build && \
    npm run optimize && \
    # Remove source maps and dev files
    find ./dist -name "*.map" -delete && \
    # Clean up build artifacts
    rm -rf node_modules/.cache

# Optional: Run tests in build stage
RUN npm run test:ci
```

### Stage 3: Production
```dockerfile
# Stage 3: Production runtime
FROM node:18-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=dependencies --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs package*.json ./

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

## Framework-Specific Templates

### Next.js Application
```dockerfile
# Next.js Multi-stage Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Python Application
```dockerfile
# Python Multi-stage Dockerfile
FROM python:3.11-slim AS base

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Install system dependencies
FROM base AS system-deps
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
FROM system-deps AS python-deps
WORKDIR /app
COPY requirements*.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Build stage
FROM python-deps AS builder
COPY . .
RUN python -m compileall . && \
    find . -name "*.pyc" -delete && \
    find . -name "__pycache__" -delete

# Production stage
FROM python:3.11-slim AS production

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

# Copy Python packages from deps stage
COPY --from=python-deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=python-deps /usr/local/bin /usr/local/bin

# Copy application
COPY --from=builder --chown=appuser:appuser /app .

# Set environment
ENV PYTHONPATH=/app
ENV PORT=8000

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### React SPA Application
```dockerfile
# React SPA Multi-stage Dockerfile
FROM node:18-alpine AS base

# Dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN yarn --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
ENV NODE_ENV=production
RUN yarn build

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080 || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

## Best Practices Implementation

### Security Hardening
```dockerfile
# Use specific version tags, not 'latest'
FROM node:18.19.0-alpine3.18

# Scan for vulnerabilities during build
RUN apk add --no-cache \
    dumb-init \
    && rm -rf /var/cache/apk/*

# Create dedicated user with minimal privileges
RUN addgroup -g 1001 -S appgroup && \
    adduser -D -s /bin/false -u 1001 -G appgroup appuser

# Set secure file permissions
COPY --chown=appuser:appgroup --chmod=755 ./app /app/

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Drop capabilities and run as non-root
USER appuser
```

### Optimization Techniques
```dockerfile
# Use .dockerignore to exclude unnecessary files
# .dockerignore content:
# node_modules
# .git
# .gitignore
# README.md
# Dockerfile
# .dockerignore

# Multi-mount caching for dependencies
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.cache/yarn \
    npm ci --only=production

# Minimize layers and use continuation
RUN apk update && \
    apk add --no-cache curl && \
    rm -rf /var/cache/apk/* && \
    curl -o /tmp/file https://example.com/file && \
    mv /tmp/file /app/file

# Use specific COPY instructions
COPY package*.json ./
COPY src/ ./src/
COPY public/ ./public/
```

### Development vs Production
```dockerfile
# Multi-target Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development target
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production target
FROM base AS production
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# Build commands:
# docker build --target development -t app:dev .
# docker build --target production -t app:prod .
```

## Additional Configurations

### Docker Compose Integration
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - app-data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  app-data:
```

### Build Arguments and Environment Variables
```dockerfile
# Build arguments for customization
ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.18
FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION}

# Environment variables with defaults
ENV NODE_ENV=production \
    PORT=3000 \
    LOG_LEVEL=info \
    CACHE_TTL=3600

# Build-time variables
ARG BUILD_DATE
ARG VERSION
ARG COMMIT_SHA

# Labels for metadata
LABEL maintainer="team@company.com" \
      version="${VERSION}" \
      build-date="${BUILD_DATE}" \
      commit="${COMMIT_SHA}" \
      description="Application container"
```

## Validation and Testing

### Security Scanning
```bash
# Scan for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image your-image:tag

# Check for best practices
docker run --rm -i hadolint/hadolint < Dockerfile
```

### Build Optimization
```bash
# Analyze image layers
docker history your-image:tag

# Check image size
docker images your-image:tag

# Dive for detailed analysis
dive your-image:tag
```

### Runtime Testing
```bash
# Test container startup
docker run --rm your-image:tag

# Test health check
docker run -d --name test-container your-image:tag
docker inspect --format='{{json .State.Health}}' test-container
```

## Output Requirements

The Dockerfile should include:
1. **Multi-stage structure**: Separate build and runtime stages
2. **Security measures**: Non-root user, minimal attack surface
3. **Optimization**: Minimal image size, efficient layer caching
4. **Health checks**: Proper application monitoring
5. **Documentation**: Clear comments explaining each section
6. **Metadata**: Appropriate labels and environment variables

## Quality Checklist

### Security
- [ ] Uses specific base image versions
- [ ] Runs as non-root user
- [ ] Minimizes attack surface
- [ ] Scans for vulnerabilities
- [ ] Implements proper secrets management

### Performance
- [ ] Optimizes layer caching
- [ ] Minimizes image size
- [ ] Uses multi-stage builds effectively
- [ ] Leverages build caches

### Maintainability
- [ ] Well-documented with comments
- [ ] Uses build arguments for flexibility
- [ ] Follows consistent naming conventions
- [ ] Includes proper metadata

### Reliability
- [ ] Includes health checks
- [ ] Handles signals properly
- [ ] Has appropriate restart policies
- [ ] Logs to stdout/stderr
