FROM node:16-alpine

WORKDIR /maps-tool

COPY package*.json ./
RUN npm install

COPY /src src

RUN npm run build

CMD ["npm", "start"]