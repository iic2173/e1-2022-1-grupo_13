const KoaRouter = require('koa-router');
const { Sequelize, Op } = require("sequelize");
const router = new KoaRouter();

router.get('map.index', '/', async(ctx) => {
  // const position = ctx.orm.position.build(ctx.request.body);
  const id = ctx.state.currentUser.id;
  const positionsListUser = await ctx.orm.position.findAll({
    attributes: [
      'title', 
      [Sequelize.fn('st_x', Sequelize.col('geography')), 'long'],
      [Sequelize.fn('ST_Y', Sequelize.col('geography')), 'lat'],
      ],
    include: [{
      model: ctx.orm.user,
      required: true
    }],
    where: {
      userId: id,
    },
    
  })  

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
    where: {
      userId: {
        [Op.ne]: id
      }
    },
    
  })  
  await ctx.render('map/index', {
    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    positionsUser: JSON.stringify(positionsListUser, null, 2),
    positionsNotUser: JSON.stringify(positionsList, null, 2)
    }); 
})

router.get('map.new.position', '/new', async(ctx) => {
  const position = ctx.orm.position.build(ctx.request.body);
  console.log(position)
  await ctx.render('map/new', {
    position,
    newPosPath: ctx.router.url('map.create.position'),
  })
})
router.post('map.create.position', '/new', async(ctx) =>{
  
  const title = (ctx.request.body.title[0]);
  const lat = (ctx.request.body.title[1]);
  const long = (ctx.request.body.title[2]);
  // const point = `SRID=4326;POINT(${lat} ${long})`
  
  const point = {"type":"Point","coordinates":[lat,long], crs: { type: 'name', properties: { name: 'EPSG:4326'} }};
  console.log(point)
  const position = ctx.orm.position.build({});
  position.title = title;
  position.userId = ctx.state.currentUser.id;
  position.geography = point;
  
  try{
    await position.save({ fields: ['title', 'userId', 'geography'] });
    ctx.redirect('/map');
  } catch (ValidationError) {
    console.log(ValidationError)
    await ctx.render('map/new', {
      position, errors: ValidationError.errors,
      newPosPath: ctx.router.url('map.create.position'),
    })
  }
})

router.get('map.new.ping', '/ping', async(ctx) => {
  const ping = ctx.orm.ping.build(ctx.request.body);

  await ctx.render('map/ping', {
    ping,
    newPingPath: ctx.router.url('map.create.ping'),
  })
})
router.post('map.create.ping', '/ping', async(ctx) =>{
  
  const {nickname} = (ctx.request.body);
  console.log(nickname)
  const friend = await ctx.orm.user.findOne({
    where: {
      nickname: nickname
    }
  })
  console.log(friend)
  try{
    const ping = ctx.orm.ping.build({});
    ping.reciverId = friend.id;
    ping.userId = ctx.state.currentUser.id;
    console.log(ping)
    await ping.save({ field: [ 'reciverId', 'userId' ]});
    ctx.redirect('/map');
  } catch {
    await ctx.render('map/ping', {
      error: 'No hemos podido encontrar a nadie con ese nickname',
      newPingPath: ctx.router.url('map.create.ping'),
    });
  }
  // const ping = ctx.orm.ping.build(ctx.request.body);
  // position.title = title;
  // position.userId = ctx.state.currentUser.id;
  // position.geography = point;
  
  // try{
  //   await position.save({ fields: ['title', 'userId', 'geography'] });
  //   ctx.redirect('/map');
  // } catch (ValidationError) {
  //   console.log(ValidationError)
  //   await ctx.render('map/new', {
  //     position, errors: ValidationError.errors,
  //     newPosPath: ctx.router.url('map.create.position'),
  //   })
  // }
})

module.exports = router;