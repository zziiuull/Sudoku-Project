FROM node:20-alpine3.20

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

ENV HOST=postgres
ENV PORT=5432
ENV USER=postgres
ENV PASSWORD=password
ENV DATABASE=sudoku
ENV DIALECT=postgres

WORKDIR /api/server

CMD ["npx", "nodemon", "index.js"]
