require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const axios = require('axios');
// const { setCurrentUser } = require('../../middlewares/auth');
// const { Sequelize, Op } = require("sequelize");

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const apiKey = {
  API_KEY: process.env.API_WEATHER || '67077cb4162cba0ee986cfcd4fed2999',
}

const weatherSerializer = new JSONAPISerializer( 'weather', {
    attributes: ['coord', 'weather', 'main', 'name', 'sys'],
    keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.post('api.weather.position', '/', async(ctx) =>{
  // console.log(ctx.request.body);
  const { lat, long } = ctx.request.body;
  // console.log(lat, long);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey.API_KEY}&units=metric`;
  
  const req = axios.get(url);
  const res = await req;
  console.log(weatherSerializer.serialize(res.data).data.attributes.sys.country);
  ctx.body = weatherSerializer.serialize(res.data);
});


module.exports = router;