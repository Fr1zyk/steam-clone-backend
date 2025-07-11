FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

# 1) копируем package.json + lockfile
COPY package*.json ./

COPY . .

EXPOSE 5000

# 6) запускаем приложение в production
CMD ["npm", "start"]