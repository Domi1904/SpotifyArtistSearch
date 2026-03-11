FROM node:20-alpine

WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build
COPY . .
RUN npm run build

# Start
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
