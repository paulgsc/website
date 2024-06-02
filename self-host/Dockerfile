# Base image
FROM node:18-alpine AS base

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat g++ make cmake
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY ./self-host/package.json ./self-host/yarn.lock* ./self-host/package-lock.json* ./self-host/pnpm-lock.yaml* ./self-host/

# Install root dependencies
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Install self-host dependencies
RUN cd self-host && \
    if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/self-host/node_modules ./self-host/node_modules

# Copy all necessary files
COPY tsconfig.json .eslintrc.json .eslintignore prettier.config.cjs turbo.json ./
COPY ./self-host/ ./self-host/

# Build the project
RUN cd self-host && \
    if [ -f yarn.lock ]; then yarn run build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Add user and group
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy build artifacts
COPY --from=builder /app/self-host/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/self-host/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/self-host/.next/static ./.next/static

# Set permissions and create .next directory if not exists
RUN if [ ! -d ".next" ]; then mkdir .next; fi && \
    chown -R nextjs:nodejs .next

# Run as non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV PORT 3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["node", "server.js"]
