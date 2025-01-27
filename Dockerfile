# Dockerfile for Next.js
FROM 23.6.1-alpine3.20

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files to the container
COPY . .

# Expose the development port
EXPOSE 3000

# Command to run the development server
CMD ["yarn", "dev"]