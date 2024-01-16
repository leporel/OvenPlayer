# usage:  
# 1. docker build -t oven_player_build .
# 2. docker run -d --rm --mount type=bind,source="$(pwd)/",target=/dist_host oven_player_build
# 2.1 pwsh: docker run -d --rm --mount "type=bind,source=$(Convert-Path .),target=/dist_host" oven_player_build

FROM node:14.17.0-alpine as build
RUN mkdir /app
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
# node_modules installed

COPY . .
RUN npm run build

FROM node:14.17.0-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["cp", "-r", "/app/dist", "/dist_host/"]