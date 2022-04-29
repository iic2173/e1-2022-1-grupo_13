const KoaRouter = require('koa-router');
const sequelize = require('sequelize');

const router = new KoaRouter();

router.get('profile', '/', async (ctx) => {
  // const args = { where: { reciverId: ctx.params.id }, include: ctx.orm.user };
  // const pings = await ctx.orm.ping.findAll(args);
  const id = ctx.state.currentUser.id
  const userList = await ctx.orm.user.findAll({
    where: {
      '$pings.reciverId$': ctx.state.currentUser.id,
    },
    include: [{
      model: ctx.orm.ping,
      as: 'pings'
    }],
  });

  const positionsList = await ctx.orm.position.findAll({
    attributes: [
      'title', 
      [sequelize.fn('st_x', sequelize.col('geography')), 'long'],
      [sequelize.fn('ST_Y', sequelize.col('geography')), 'lat'],
      ],
    where: { userId: ctx.state.currentUser.id}
  });

  const user = await ctx.orm.user.findByPk(id);
  await ctx.render('profile/index', {
    userList,
    user,
    positionsList
    // perfilFunction: (userObj) => ctx.router.url('', { id: userObj.id }),
    // pingDetailsPath: (userId) => ctx.router.url('books.show', { id: bookId }),
  });
});

module.exports = router;