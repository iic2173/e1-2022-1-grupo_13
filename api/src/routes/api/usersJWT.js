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

<<<<<<< HEAD
    let tags_array_1 = []
    let tags_array_2 = []

    const positions_u1 = await currentUser.getPositions()
    const positions_u2 = await user2.getPositions()

    positions_u1.forEach((position) => {
        tag = position.getTag()
=======
    let cords_dict_1 = {}
    let cords_dict_2 = {}

    let tags_array_1 = []
    let tags_array_2 = []

    let tags_dict_1 = {}
    let tags_dict_2 = {}


    const positions_u1 = await currentUser.getPositions()
    const positions_u2 = await user2.getPositions()

    


    positions_u1.forEach((position) => {
        tag = await position.getTag()
>>>>>>> 4a6c814af5977e914261cb40f72cf3ae92ceb955
        tags_array_1.push(tag.category)
        
    })
    positions_u2.forEach((position) => {
<<<<<<< HEAD
        tag = position.getTag()
        tags_array_2.push(tag.category)
    })

    ctx.body = { 
        "sidi": {"positions_1": positions_u1, "positions_2": positions_u2},
=======
        tag = await position.getTag()
        tags_array_2.push(tag.category)
    })

    // for (var i=0; i < tags_array_1.length; i++) {
    //     tags_dict_1[tags_array_1[i]] = (tags_dict_1[tags_array_1[i]] || 0) + 1;
    // }

    // for (var i=0; i < tags_array_2.length; i++) {
    //     tags_dict_2[tags_array_2[i]] = (tags_dict_2[tags_array_2[i]] || 0) + 1;
    // }

    ctx.body = { 
        "sidi": {"positions_1": positions_u1, "positions_2": positions_u2},
        // "siin": {"dict_1": tags_dict_1, "dict_2": tags_dict_2}
>>>>>>> 4a6c814af5977e914261cb40f72cf3ae92ceb955
        "siin" : {"tags_1":tags_array_1, "tags_2": tags_array_2}
        };

})

<<<<<<< HEAD
=======
router.get('api.users.siin', '/siin/:id', async (ctx) => {
    const { currentUser } = ctx.state;
    const user2 = await ctx.orm.user.findByPk(ctx.params.id);

    const positions_u1 = await currentUser.getPositions()
    const tags_array_1 = []
    const positions_u2 = await user2.getPositions()
    const tags_array_2 = []


    positions_u1.forEach((position) => {
        tag = position.getTag()
        tags_array_1.push(tag.category)
    })
    positions_u2.forEach((position) => {
        tag = position.getTag()
        tags_array_2.push(tag.category)
    })

    var tags_dict_1 = {}

    for (var i=0; i < tags_array_1.length; i++) {
        tags_dict_1[tags_array_1[i]] = (tags_dict_1[tags_array_1[i]] || 0) + 1;
    }
    var tags_dict_1 = {}

    var tags_dict_2 = {}

    for (var i=0; i < tags_array_1.length; i++) {
        tags_dict_1[tags_array_1[i]] = (tags_dict_1[tags_array_1[i]] || 0) + 1;
    }

    for (var i=0; i < tags_array_2.length; i++) {
        tags_dict_2[tags_array_2[i]] = (tags_dict_2[tags_array_2[i]] || 0) + 1;
    }

    ctx.body = { "positions_1": positions_u1, "positions_2": positions_u2 };



})

>>>>>>> 4a6c814af5977e914261cb40f72cf3ae92ceb955
module.exports = router;