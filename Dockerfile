# Dockerfile
FROM node:18-alpine

# Рабочая директория в контейнере
WORKDIR /app

# Сначала копируем только package-файлы, чтобы кэшировать npm install
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Копируем остальной код
COPY . .

# Открываем порт
EXPOSE 5000

# Запуск приложения
CMD ["node", "app.js"]
