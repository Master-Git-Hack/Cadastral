# Dockerfile for Next.js
FROM node:23.9-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy all files to the container
COPY . .
ENV NODE_ENV=production \
    NEXT_PUBLIC_API_URL=http://backend_v3:5000 \
    NEXT_PUBLIC_API_ENDPOINT=api \
    NEXT_PUBLIC_API_VERSION=v3
RUN yarn build 
EXPOSE 3000

# Run Next.js in production mode
CMD ["yarn", "start"]