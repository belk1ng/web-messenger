FROM node:16-alpine

COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm ci --legacy-peer-deps && npm run build && npm i -g serve

CMD serve -s build
