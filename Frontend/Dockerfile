FROM node:18.18-alpine3.18 as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
COPY . /app
CMD ng serve --host 0.0.0.0 --port 80

EXPOSE 80