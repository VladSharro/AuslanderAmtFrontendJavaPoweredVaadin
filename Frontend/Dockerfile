FROM node:18.18-alpine3.18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
CMD ng serve --host 0.0.0.0

# FROM nginx:alpine

# COPY deployment/nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /app/dist/asdfrontend /usr/share/nginx/html/asdfrontend

EXPOSE 80