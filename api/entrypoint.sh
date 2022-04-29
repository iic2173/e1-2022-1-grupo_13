#!/bin/sh
nom install yarn
yarn sequelize db:migrate
yarn sequelize db:seed:all
yarn start