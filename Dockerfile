# Dockerfile for Next.js
FROM node:23.6.1-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files to the container
COPY . .
RUN yarn build

# Use a minimal image for production
FROM node:23.6.1-alpine3.20 AS runner
WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production

# Expose port 3000 for Next.js
EXPOSE 3000

# Run Next.js in production mode
CMD ["yarn", "start"]