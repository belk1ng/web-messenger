FROM node:16-alpine

COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm ci

# Start build
RUN npm run build
RUN npm i -g serve
CMD serve -s build

