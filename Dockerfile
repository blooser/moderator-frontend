FROM node:alpine

WORKDIR /app


#NV PATH /code/node_modules/.bin:$PATH


COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./


CMD ["npm", "start"]
