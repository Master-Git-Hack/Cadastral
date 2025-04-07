
FROM node:23.9-alpine3.20 AS base

# FROM base AS deps

# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ENV NODE_ENV=production \
#     NEXT_PUBLIC_API_URL=http://backend:5000 \
#     NEXT_PUBLIC_API_ENDPOINT=api \
#     NEXT_PUBLIC_API_VERSION=v3 \
#     HOSTNAME="0.0.0.0" \
#     PORT=3000 \
#     NEXT_TELEMETRY_DISABLED=1

# RUN \
#   if [ -f yarn.lock ]; then yarn run build; \
#   elif [ -f package-lock.json ]; then npm run build; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
#   else echo "Lockfile not found." && exit 1; \
#   fi

# FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY ./public ./public
COPY ./.next/standalone ./
COPY ./.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=http://backend:5000 \
    NEXT_PUBLIC_API_ENDPOINT=api \
    NEXT_PUBLIC_API_VERSION=v3 \
    HOSTNAME="0.0.0.0" \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

CMD ["node", "server.js"]
