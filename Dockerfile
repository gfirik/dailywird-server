FROM node:alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

EXPOSE 4000

CMD [ "pnpm", "start" ]