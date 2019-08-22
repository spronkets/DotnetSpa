FROM node:10.16.3
WORKDIR /app
EXPOSE 4200

COPY "DotnetSpa.AngularClient/package*.json" ./

RUN npm run restore

COPY "DotnetSpa.AngularClient/" .

CMD npm run start:docker
