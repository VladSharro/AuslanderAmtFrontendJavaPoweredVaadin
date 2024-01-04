FROM node:18.18-alpine3.18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

COPY deployment/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/asdfrontend /usr/share/nginx/html/asdfrontend

EXPOSE 80