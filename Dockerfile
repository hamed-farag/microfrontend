FROM node:18-alpine

WORKDIR /app/

RUN curl -f https://get.pnpm.io/v8.10.2.js | node - add --global pnpm

COPY . .

RUN pnpm install --frozen-lockfile --prod

RUN pnpm build:all

EXPOSE 9000 8080 8081 8082 8083

RUN pnpm start