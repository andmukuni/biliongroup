# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache python3 make g++
WORKDIR /app

# Install all dependencies (including dev) for build
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Production-only dependencies (used by final image)
FROM base AS production-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Build application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Coolify injects runtime env vars as build ARG/ENV (e.g. DB_CONNECTION=postgres).
# Force SQLite here so `node ace build` never tries to boot a Postgres connection.
RUN APP_KEY="buildtimekey01234567890123456789012" \
    HOST="0.0.0.0" \
    PORT="3333" \
    LOG_LEVEL="info" \
    SESSION_DRIVER="cookie" \
    DB_CONNECTION="sqlite" \
    NODE_ENV="production" \
    node ace build

# Production runtime
FROM node:22-alpine AS production
RUN apk add --no-cache wget
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333

COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN mkdir -p tmp uploads

EXPOSE 3333

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3333}/health || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "bin/server.js"]
