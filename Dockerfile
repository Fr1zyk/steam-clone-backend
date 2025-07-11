# steam-clone-backend/Dockerfile

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

# 1) копируем package.json + lockfile
COPY package.json package-lock.json ./

# 2) ставим точные версии (prod-зависимости)
RUN npm ci --omit=dev \
    # 3) удаляем все *.d.ts, чтобы не цеплялись декларации вместо JS
    && find node_modules -type f -name '*.d.ts' -delete

# 4) копируем весь исходник
COPY . .

# 5) открываем порт
EXPOSE 5000

# 6) запускаем приложение в production
CMD ["npm", "start"]
