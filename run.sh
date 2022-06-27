#!/bin/bash
cd /home/ec2-user/e1-2022-1-grupo_13
docker-compose build
docker-compose up -d
cd nano-messaging-master
docker-compose build
docker-compose up -d
docker-compose exec chat npx sequelize db:migrate
docker-compose exec chat npx sequelize db:seed:all