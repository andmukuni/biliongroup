# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
RUN apk add --no-cache python3 make g++
WORKDIR /app

# Install all dependencies (including dev) for build
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN node ace build

# Production runtime
FROM node:22-alpine AS production
RUN apk add --no-cache python3 make g++ wget
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3333

COPY --from=build /app/build ./
RUN npm ci --omit=dev && npm cache clean --force

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN mkdir -p tmp uploads

EXPOSE 3333

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3333}/health || exit 1

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["node", "bin/server.js"]
