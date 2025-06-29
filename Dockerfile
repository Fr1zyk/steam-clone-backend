# Dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
