FROM node:16-alpine

COPY . /app
WORKDIR /app

EXPOSE 3000

# Install production dependencies & replace node-sass by sass
RUN npm uninstall node-sass && npm install -D sass
RUN npm ci

# Start build
RUN npm run build
RUN npm i -g serve
CMD serve -s build

