FROM node:22.14.0
WORKDIR /app
EXPOSE 8080

COPY "DotnetSpa.VueClient/package*.json" ./

RUN npm run build

COPY "DotnetSpa.VueClient/" .

CMD npm run start:docker
