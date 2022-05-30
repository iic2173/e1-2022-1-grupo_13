FROM node:12.22.11-alpine

# RUN mkdir /api

# WORKDIR /api

WORKDIR /api


COPY package*.json ./

RUN apk --no-cache add curl
RUN npm install
# RUN npm install yarn
# RUN yarn sequelize db:migrate
# RUN yarn sequelize db:seed:all
COPY ./entrypoint.sh ./entrypoint.sh

COPY . . 

ENTRYPOINT [ "sh", "/api/entrypoint.sh" ]
# RUN git clone https://github.com/vishnubob/wait-for-it.git
EXPOSE 3000

# CMD [ "node", "index.js" ]
# CMD ["sh", "-c", "npm install yarn && yarn sequelize db:migrate && yarn sequelize db:seed && yarn start"]
