FROM node:20-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci

# Build
COPY . .
RUN npx vite build

# Serve mit http-server (oder nginx)
RUN npm install -g serve
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]
