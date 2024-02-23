# syntax=docker/dockerfile:1

# # base image
FROM node:20.9.0-bookworm-slim as base
WORKDIR /app
RUN chown -R node:node /app && chmod -R 770 /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# build
FROM base AS builder
COPY --chown=node:node . .
USER node
COPY . .
RUN \
  if [ -f package-lock.json ]; then npm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# development for local
FROM base AS runner
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
