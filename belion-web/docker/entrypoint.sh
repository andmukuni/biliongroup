#!/bin/sh
set -e

echo "Running database migrations..."
node ace migration:run --force

echo "Starting Belion Groupe web server on ${HOST:-0.0.0.0}:${PORT:-3333}..."
exec "$@"
