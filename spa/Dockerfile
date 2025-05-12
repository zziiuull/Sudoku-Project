FROM node:alpine3.20

WORKDIR /spa

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]