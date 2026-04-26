# Strapi Dockerfile
FROM node:18-alpine

# Install dependencies for building native modules
RUN apk add --no-cache build-base gcc autoconf automake libtool nasm pkgconfig libpng-dev

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app files
COPY . .

# Build admin panel
ENV NODE_ENV=production
RUN npm run build

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
