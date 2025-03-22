FROM node:lts-alpine AS base
WORKDIR /app

# Base installer
FROM base AS installer
ENV COREPACK_INTEGRITY_KEYS=0
RUN corepack enable
COPY . .

# Build stage
FROM installer AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=bot build
RUN pnpm deploy --filter=bot --prod /prod/bot

# Production stage
FROM base
ENV NODE_ENV=production
COPY --from=build /prod/bot/node_modules /app/node_modules
COPY --from=build /app/apps/bot/build .
CMD ["node", "./index.js"]