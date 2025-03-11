FROM node:22.14.0
WORKDIR /app
EXPOSE 4200

COPY "DotnetSpa.AngularClient/package*.json" ./

RUN npm run restore

COPY "DotnetSpa.AngularClient/" .

CMD npm run start:docker
