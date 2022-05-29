const KoaRouter = require('koa-router');

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const UserSerializer = new JSONAPISerializer( 'user', {
    attributes: ['email', 'nickname', 'phone_num', 'telegram_user', 'password'],
    keyForAttribute: 'camelCase',
});

const nodemailer = require('nodemailer');
const { setCurrentUser } = require('../../middlewares/auth');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "grupo13arquisoft@outlook.cl",
        pass: "g13arquisoft"
    }
})

const router = new KoaRouter();

router.post('api.users.create', '/', async(ctx) => {
    try {
        const user = ctx.orm.user.build(ctx.request.body);
        await user.save({ fields: ['email', 'nickname', 'phone_num', 'telegram_user', 'password']});
        ctx.status = 201;
        ctx.body = UserSerializer.serialize(user);
        ctx.body = user;
        console.log("###");
        console.log(user.email);
        const options = {
            from: "grupo13arquisoft@outlook.cl",
            to: user.email,
            subject: "Verificacion de cuenta",
            text: "Verificar cuenta"
        }
        transporter.sendMail(options, function (err, info) {
            if(err){
                console.log(err);
                return;
            }
            console.log(info.response);
        });
    } catch (ValidationError) {
        ctx.throw(400, 'Bad Request');
    }
});

router.get("api.users.list", "/", async (ctx) => {
    const users = await ctx.orm.user.findAll();
    ctx.body = UserSerializer.serialize(users);
    ctx.body = users;

})


router.get('api.users.show', '/:id', async(ctx) =>{
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404, 'El usuario buscado no existe');
    }
    ctx.body = UserSerializer.serialize(user);
});

router.get('api.users.indexes', '/indexes/:id', async (ctx) => {
    const { currentUser } = ctx.state;
    const user2 = await ctx.orm.user.findByPk(ctx.params.id);

    let tags_array_1 = []
    let tags_array_2 = []
    let positions_array_1 = []
    let positions_array_2 = []

    const positions_u1 = await currentUser.getPositions()
    const positions_u2 = await user2.getPositions()

    positions_u1.forEach( element => {
        let sendable_obj = {
          "lat_long": element["dataValues"]["geography"]["coordinates"]
        }
    
        positions_array_1.push(sendable_obj);
      });

    positions_u2.forEach( element => {
        let sendable_obj = {
          "lat_long": element["dataValues"]["geography"]["coordinates"]
        }
    
        positions_array_2.push(sendable_obj);
      });

    positions_u1.forEach((position) => {
        tag = position.getTag()
        tags_array_1.push(tag.category)
        
    })
    positions_u2.forEach((position) => {
        tag = position.getTag()
        tags_array_2.push(tag.category)
    })

    ctx.body = { 
        "ids": {'user_1': currentUser.id, 'user_2': user2.id, 'pingId': ping.id },
        "sidi": {"positions_1": positions_array_1, "positions_2": positions_array_2},
        "siin" : {"tags_1":tags_array_1, "tags_2": tags_array_2}
        };

})

module.exports = router;