const KoaRouter = require('koa-router');
const { setCurrentUser, decodeJWT } = require('../../middlewares/auth');
const axios = require('axios');
// const jwt = require('koa-jwt');

const router = new KoaRouter();

router.use(decodeJWT);
// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
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

router.patch('api.pings.accept', '/:id/accept', async (ctx) => {
    
    const ping = await ctx.orm.ping.findByPk(ctx.params.id);

    const user1 = await ctx.orm.user.findByPk(ping.userId)
    const user2 = await ctx.orm.user.findByPk(ping.reciverId)


    const positions_u1 = await ctx.orm.position.findAll(
        { where: { userId: ping.userId} } );
    const positions_u2 = await ctx.orm.position.findAll(
        { where: { userId: ping.reciverId} } );

    let tags_array_1 = []
    let tags_array_2 = []
    let positions_array_1 = []
    let positions_array_2 = []

    for (const element of positions_u1) {
        let sendable_obj = {
            "lat_long": element["dataValues"]["geography"]["coordinates"]
        }
        positions_array_1.push(sendable_obj);
        const tag = await element.getTags()
        tags_array_1.push(tag[0]["category"])
    }
    for (const element of positions_u2) {
        let sendable_obj = {
            "lat_long": element["dataValues"]["geography"]["coordinates"]
        }
        positions_array_2.push(sendable_obj);
        const tag = await element.getTags()
        tags_array_2.push(tag[0]["category"])
    }

    try {
        // enviar un body con "status: 1 o 2 " 1 es aceptado 2 es rechazado

        const body = { 
            "ids": {'user_1': user1.id, 'user_2': user2.id, 'pingId': ping.id },
            "sidi": {"positions_1": positions_array_1, "positions_2": positions_array_2},
            "siin" : {"tags_1":tags_array_1, "tags_2": tags_array_2}
            };
                        
        
        const url = 'http://web:8010/api/polls'
        const req = axios.post(url, body, {headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json"
        }
        });

        const response = await req;
        const sidi = response.data['sidi'];
        const siin = response.data['siin'];
        const dindin = response.data['dindin'];

        await ping.update({ status: 1, sidi: sidi, siin: siin, dindin: dindin })
        ctx.body = ping;

    } catch (ex) {
        if (ex && ex !== undefined && ex.toString && ex.toString !== undefined) {
            console.log(ex.toString());
        }
        if (
            ex.response &&
            ex.response !== undefined &&
            ex.response.data &&
            ex.response.data !== undefined
        ) {
            console.log(ex)
        }
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



module.exports = router;