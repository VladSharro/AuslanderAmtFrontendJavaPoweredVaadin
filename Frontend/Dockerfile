FROM node:18.18-alpine3.18 as build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:latest

COPY default /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/asdfrontend /var/www/aspd/asdfrontend