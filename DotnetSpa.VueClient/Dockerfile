FROM node:10.16.3
WORKDIR /app
EXPOSE 8080

COPY "DotnetSpa.VueClient/package*.json" ./

RUN npm run restore

COPY "DotnetSpa.VueClient/" .

CMD npm run start:docker
