require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const { setCurrentUser } = require('../../middlewares/auth');
const { Sequelize, Op } = require("sequelize");

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
    // await ctx.render('map/index', {
    //   // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    //   positionsUser: JSON.stringify(positionsListUser, null, 2),
    //   positionsNotUser: JSON.stringify(positionsList, null, 2)
    //   }); 
    ctx.body = PositionSerializer.serialize(positionsList)
});

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
router.use(setCurrentUser)

router.post('api.map.create.position', '/new', async(ctx) =>{
    const { currentUser } = ctx.state;
    const { title, lat, long } = ctx.request.body;
    const geography = {"type":"Point","coordinates":[lat,long], crs: { type: 'name', properties: { name: 'EPSG:4326'} }};
    const position = ctx.orm.position.build({ userId: currentUser.id, title, geography});
    try {
        await position.save();
        ctx.body = PositionSerializer.serialize(position);
        ctx.status;
    } catch (error) {
        ctx.throw(400, `Ups! \n${error}`);
    }
});

router.post('api.map.create.ping', '/ping', async(ctx) =>{
    const { currentUser } = ctx.state;
    const { friendId } = ctx.request.body;
    const friend = await ctx.orm.user.findOne({
        where: {
          id: friendId
        }
      });
    const ping = ctx.orm.ping.build({ userId: currentUser.id, reciverId: friend.id});
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
    idsArray.push(currentUser.id)

    const positionsList = await ctx.orm.position.findAll(
      { where: { userId: {
        [Op.or]: idsArray
      }} });


    ctx.body = PositionSerializer.serialize(positionsList);
    
})

module.exports = router;