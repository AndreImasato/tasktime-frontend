# Stage 0: build-stage
FROM node:19.7-slim AS build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# Stage 1: based on Nginx, having only the compiled app ready for production with Nginx
FROM nginx:1.17-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /app/envs/prod/default.conf /etc/nginx/conf.d/default.conf