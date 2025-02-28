# Dockerfile for Next.js
FROM node:23.9-alpine3.20 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .
RUN npm run build && npm prune --production

# Use a minimal image for production
FROM nginx:1.27.4-alpine AS runner
WORKDIR /app

COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
ENV NODE_ENV=production
COPY nginx.conf /etc/nginx/nginx.conf
# Expose port 3000 for Next.js
EXPOSE 80

# Run Next.js in production mode
CMD ["nginx", "-g", "daemon off;"]