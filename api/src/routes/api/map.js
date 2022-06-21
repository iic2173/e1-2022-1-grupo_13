require('dotenv').config();
const KoaRouter = require('koa-router');
// const jwt = require('koa-jwt');
const { jwtCheck, getManagementApiJWT, setCurrentUser, decodeJWT } = require('../../middlewares/auth');
const { Sequelize, Op } = require("sequelize");
const axios = require('axios');
const JSONAPISerializer = require('jsonapi-serializer').Serializer

const PositionSerializer = new JSONAPISerializer( 'position', {
    attributes: ['userId', 'title', 'geography'],
    keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.get('api.map.index', '/', async(ctx) => {
    // const id = ctx.state.currentUser.id;
    // const positionsListUser = await ctx.orm.position.findAll({
    //   attributes: [
    //     'title', 
    //     [Sequelize.fn('st_x', Sequelize.col('geography')), 'long'],
    //     [Sequelize.fn('ST_Y', Sequelize.col('geography')), 'lat'],
    //     ],
    //   include: [{
    //     model: ctx.orm.user,
    //     required: true
    //   }],
    //   where: {
    //     userId: id,
    //   },
    // })  
    const positionsList = await ctx.orm.position.findAll()
    ctx.body = PositionSerializer.serialize(positionsList)
});


// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
router.use(jwtCheck);
router.use(decodeJWT)
router.use(setCurrentUser)

router.post('api.map.create.position', '/new', async(ctx) =>{
    const { currentUser } = ctx.state;
    const { title, lat, long, tags } = ctx.request.body;
    
    const tag = await ctx.orm.tag.findByPk(tags['value']);
    const geography = {"type":"Point","coordinates":[lat,long], crs: { type: 'name', properties: { name: 'EPSG:4326'} }};
    const position = ctx.orm.position.build({ userId: currentUser.id, title, geography});

    try {
        await position.save();
        await position.addTag(tag);
        await position.save();
        ctx.body = PositionSerializer.serialize(position);
        ctx.status;
    } catch (error) {
        ctx.throw(400, `Ups! \n${error}`);
    }
});

router.get('api.map.user.positions', '/user/:id', async(ctx) => {
  // const { currentUser } = ctx.state;
  let responseArr = [];
  const positionsList = await ctx.orm.position.findAll(
    // { where: { userId: currentUser.id } } );
    { where: { userId: ctx.params.id } } );
  for (const element of positionsList){
    const tags = await element.getTags()
    let sendable_obj = {
      'id': element["dataValues"]["id"],
      "title": element["dataValues"]["title"], 
      "geography": element["dataValues"]["geography"]["coordinates"],
      "tag": tags[0]
    }
    responseArr.push(sendable_obj);
  };
  ctx.body = responseArr;
})

router.post('api.map.create.ping', '/ping', async(ctx) =>{
    const { currentUser } = ctx.state;
    // const friend = await ctx.orm.user.findOne({
    //     where: {
    //       id: friendId
    //     }
    //   });
    const { friendId } = ctx.request.body;
    const apiJWT = await getManagementApiJWT();
    const options = { 
        // method: "GET",
        // url: "https://dev-prxndioi.us.auth0.com/api/v2/users",
        params: {q: `user_id:"${friendId}"`, search_engine: 'v3'},
        headers: { 
            'Authorization' : `Bearer ${apiJWT.access_token}`,
            'Content-Type': 'application/json'
        },
        };
    const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users`;
    const req = axios.get(url, options);
    const res = await req;
        // console.log(res.data);
        // console.log(apiSerializer.serialize(res.data).data);
        // ctx.status = 201;
        // ctx.body = apiSerializer.serialize(res.data);
    if (res.data.length == 0) {
        console.log('IN')
        ctx.throw(404, 'El usuario que trata de contactar no existe');
    }
    const friend = res.data;
    console.log(currentUser);
    console.log(friend);
    const ping = ctx.orm.ping.build({ userId: currentUser.sub, reciverId: friend.user_id});
      try {
        await ping.save();
        ctx.body = 'Ping enviado con exito';
      } catch (error) {
        ctx.throw(400, `Ups! \n${error}`);
        };
});

router.post('api.map.compare', '/compare', async(ctx) => {
    const { currentUser } = ctx.state;
    const { idsArray } = ctx.request.body;
    idsArray.push(currentUser.sub)

    let responseDict = {}
    idsArray.forEach(element => {
      responseDict[element] = [];
    });

    const positionsList = await ctx.orm.position.findAll(
      { where: { userId: {
        [Op.or]: idsArray
      }} });

    positionsList.forEach( element => {
      let current_id = element["dataValues"]["userId"];
      let sendable_obj = {
        id: element["dataValues"]["id"],
        "title": element["dataValues"]["title"], 
        "geography": element["dataValues"]["geography"]["coordinates"],
      }

      responseDict[current_id].push(sendable_obj);
    });

    ctx.body = responseDict;
    
})

module.exports = router;