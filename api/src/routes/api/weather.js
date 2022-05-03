require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const axios = require('axios');
// const { setCurrentUser } = require('../../middlewares/auth');
// const { Sequelize, Op } = require("sequelize");

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const apiKey = `${process.env.API_WEATHER}`

const weatherSerializer = new JSONAPISerializer( 'weather', {
    attributes: ['coord', 'weather', 'main'],
    keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.post('api.weather.position', '/', async(ctx) =>{
  // console.log(ctx.request.body);
  const { lat, long } = ctx.request.body;
  // console.log(lat, long);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  // let weather;
  // const weather2 = request(url, function(err, response, body) {

  //   // On return, check the json data fetched
  //   if (err) {
  //       console.log(err);
  //   } else {
  //       const weather = JSON.parse(body);
  //       console.log(weather.coord);
  //       const w = JSON.stringify(body, null, 2);
  //       // console.log(JSON.parse(w));
  //       // const aux = weatherSerializer(body);
  //       console.log(response);
  //       return response; 
  //   }
  // });
  // // const weather = fetch(url).then(resp => {return resp.json()});
  // console.log(weather2);
  // if (weather2 == undefined){
  //   ctx.throw(400, 'No hemos podido encontrar la locación :(');
  // }
  // else{
  //   console.log(typeof(weather2));
  //   // const w2 = JSON.parse(weather2);
  //   // console.log(typeof(w2));
  //   console.log(weather2.body);
  //   console.log(weather2.main);
  //   console.log(weather2.weather);
  //   ctx.status = 201;
  //   ctx.body = weather2;
  //   // ctx.body = weatherSerializer.serialize(weather2);
  // }

  const req = axios.get(url);
  const res = await req;
  console.log(res.data.name);
  ctx.body = res.data;
});


module.exports = router;