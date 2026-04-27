# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Accept VITE_API_URL as a build-time arg so the compiled JS uses the right base.
# Leave empty (default) to use relative URLs, which nginx proxies to the backend.
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
