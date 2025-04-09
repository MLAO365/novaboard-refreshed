#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
pnpm install --no-frozen-lockfile

# Rebuild bcrypt
echo "Rebuilding bcrypt..."
pnpm rebuild bcrypt --build-from-source

# Run the build
echo "Running build..."
pnpm run build

echo "Build completed successfully" 