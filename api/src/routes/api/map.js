const KoaRouter = require('koa-router');
const { setCurrentUser } = require('../../middlewares/auth');

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const PositionSerializer = new JSONAPISerializer( 'position', {
    attributes: ['userId', 'title', 'geography'],
    keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.post('api.map.index', '/', async(ctx) => {
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
    const positionsList = await ctx.orm.position.findAll({
      attributes: [
        'title', 
        [Sequelize.fn('st_x', Sequelize.col('geography')), 'long'],
        [Sequelize.fn('ST_Y', Sequelize.col('geography')), 'lat'],
        ],
      include: [{
        model: ctx.orm.user,
        required: true
      }],
    })
    // await ctx.render('map/index', {
    //   // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    //   positionsUser: JSON.stringify(positionsListUser, null, 2),
    //   positionsNotUser: JSON.stringify(positionsList, null, 2)
    //   }); 
    ctx.body = PositionSerializer(positionsList)
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

router.post('map.create.ping', '/ping', async(ctx) =>{
    const { currentUser } = ctx.state;
    const {nickname} = (ctx.request.body);
    const friend = await ctx.orm.user.findOne({
        where: {
          nickname: nickname
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

module.exports = router;