FROM node:14 as build

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm -s ci --no-progress
ADD . ./
RUN npm -s run build:prod

FROM caddy:2 as runtime

WORKDIR /app/dist
COPY --from=build /app/dist/ui ./
WORKDIR /app
COPY Caddyfile ./

CMD ["caddy", "run", "--config", "Caddyfile"]
