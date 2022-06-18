#!/bin/bash
cd /home/ec2-user/e1-2022-1-grupo_13
docker-compose build
docker-compose run web python manage.py migrate
docker-compose up -d