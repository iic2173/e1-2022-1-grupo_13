const KoaRouter = require('koa-router');
// const { setCurrentUser } = require('../../middlewares/auth');
// const jwt = require('koa-jwt');

const router = new KoaRouter();

// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
// router.use(setCurrentUser)

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

router.patch('api.pings.accept', '/:id/accept', async (ctx) => {
    
    const ping = await ctx.orm.ping.findByPk(ctx.params.id);

    try {
        // enviar un body con "status: 1 o 2 " 1 es aceptado 2 es rechazado
        await ping.update({ status: 1 })
        ctx.body = ping;
        // enviar request con los workers
        // hay que poner el codigo aca :D
    } catch (validationError) {
        ctx.throw(400)
    }
})

router.patch('api.pings.reject', '/:id/reject', async (ctx) => {
    
    const ping = await ctx.orm.ping.findByPk(ctx.params.id);

    try {
        await ping.update({ status: 2 })
        ctx.body = ping;
    } catch (validationError) {
        ctx.throw(400)
    }
})

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

router.get("api.pings.sent", "/sent", async (ctx) => {
    if (!ctx.state.currentUser) {
    ctx.throw(401, 'No iniciaste sesion.');
    }
    const id = ctx.state.currentUser.id
    // console.log(id)
    const ping = await ctx.orm.ping.findAll({
        where: {
            userId: id
        }
    });
    // console.log(ping)
    ctx.body = ping;
});

router.patch('api.pings.update.indexes', async (ctx) => {
    const indexes = ctx.request.body
    const ping = await ctx.orm.ping.findByPk(indexes['pingId']);
    const sidi = indexes['sidi'];
    const siin = indexes['siin'];
    const dindin = indexes['dindin'];

    try {
        await ping.update({ sidi: sidi, siin: siin, dindin: dindin })
        ctx.body = ping;
    } catch (validationError) {
        ctx.throw(400)
    }

})


module.exports = router;