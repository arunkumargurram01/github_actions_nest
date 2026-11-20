# ---------- Stage 1: build ----------
FROM node:24-alpine AS build
WORKDIR /app

# Install all dependencies (including dev deps needed to compile TypeScript)
COPY package*.json ./
RUN npm ci

# Copy source and compile to dist/
COPY . .
RUN npm run build

# ---------- Stage 2: dev ----------
FROM node:24-alpine AS dev
ENV NODE_ENV=dev
WORKDIR /app

# Install only runtime dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled output from the build stage
COPY --from=build /app/dist ./dist

# Run as the non-root user that ships with the node image
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-3000}/health || exit 1

CMD ["node", "dist/main.js"]
