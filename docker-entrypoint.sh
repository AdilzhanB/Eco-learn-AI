#!/bin/bash
set -e

# Wait for database to be ready (if using external database)
echo "Starting EcoTracker server..."

# Navigate to server directory
cd /app/server

# Start the server
exec node dist/index.js
