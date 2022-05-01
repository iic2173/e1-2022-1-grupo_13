const KoaRouter = require('koa-router');
const { setCurrentUser } = require('../../middlewares/auth');
const jwt = require('koa-jwt');

const router = new KoaRouter();

router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
router.use(setCurrentUser)

router.post('api.pings.create', '/send/:id', async(ctx) => {
    if (!ctx.state.currentUser) {
        ctx.throw(401, 'No tienes permiso para crear solicitudes');
    }

    const reciver = await ctx.orm.user.findByPk(ctx.params.id);
    if (!reciver) {
        ctx.throw(404, 'El usuario que trata de contactar no existe');
    }

    if (ctx.params.id == ctx.state.currentUser.id) {
        ctx.throw(404, 'Se esta tratando de comunicar consigo mismo');
    }

    try {
        const ping = ctx.orm.ping.build(ctx.request.body);
        ping.reciverId = parseInt(ctx.params.id, 10);
        ping.userId = ctx.state.currentUser.id;
        await ping.save({ field: [ 'reciverId', 'userId' ]});
        ctx.status = 201;
        ctx.body = ping;
    } catch (ValidationError) {
        console.log(ValidationError);
        ctx.throw(400, 'No hemos podido completar el ping :(');
    }
});

router.get("api.pings.list", "/recieved", async (ctx) => {
    if (!ctx.state.currentUser) {
    ctx.throw(401, 'No iniciaste sesion.');
    }
    const id = ctx.state.currentUser.id
    // console.log(id)
    const ping = await ctx.orm.ping.findAll({
        where: {
            reciverId: id
        }
    });
    // console.log(ping)
    ctx.body = ping;
})

module.exports = router;