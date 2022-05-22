#!/bin/bash

cd /home/ubuntu/e1-2022-1-grupo_13
docker-compose down
sudo cp -r .env ../
cd ~
sudo rm -fr /home/ubuntu/e1-2022-1-grupo_13