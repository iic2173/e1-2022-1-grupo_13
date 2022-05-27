#!/bin/bash
cd /home/ubuntu/e1-2022-1-grupo_13
sudo docker-compose down -v
sudo cp -r .env ../
cd ~
sudo rm -fr /home/ubuntu/e1-2022-1-grupo_13