FROM node:12

WORKDIR /usr/src/chat

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "start"]