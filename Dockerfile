FROM node:20-alpine

WORKDIR /app

# Install dependencies first to leverage caching
COPY package*.json ./
RUN npm install --only=production || npm install

# Copy source
COPY . .

# Health check deps (optional)
EXPOSE 5000

# Start server directly by file path to avoid script path weirdness
CMD ["node","app.js"]
