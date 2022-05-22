#!/bin/bash
sudo chown -R ubuntu:root /home/ubuntu/e1-2022-1-grupo_13
cd /home/ubuntu/e1-2022-1-grupo_13
sudo mv ../.env ./.env
sudo docker-compose build
sudo docker-compose up -d