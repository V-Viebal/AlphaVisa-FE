# build stage
FROM node:22 AS build-web
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm i -g nx@18.3.2
RUN npm i -g gzipper@8.1.0
RUN npm i
RUN nx run angular-core:build
RUN nx build --configuration=production
RUN gzipper c dist/production --include js,css,html,svg,eot,ttf,otf,woff,woff2,png,jpg,gif,webp --output-file-format [filename].[ext].gz dist/compressed

# production stage
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-web /app/dist/compressed /usr/share/nginx/html
