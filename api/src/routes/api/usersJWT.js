const KoaRouter = require('koa-router');
const { jwtCheck, getManagementApiJWT, setCurrentUser, decodeJWT } = require('../../middlewares/auth');
const JSONAPISerializer = require('jsonapi-serializer').Serializer
const axios = require('axios');

const UserSerializer = new JSONAPISerializer( 'user', {
    attributes: ['email', 'nickname', 'phone_num', 'telegram_user', 'password'],
    keyForAttribute: 'camelCase',
});

const apiSerializer = new JSONAPISerializer( 'users', {
    attributes: ['email', 'nickname', 'user_id'],
    keyForAttribute: 'camelCase',
});

const nodemailer = require('nodemailer');
// const { setCurrentUser } = require('../../middlewares/auth');

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

router.use(jwtCheck);

router.use(decodeJWT);
// router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }))
router.use(setCurrentUser)

router.get("api.users.list", "/", async (ctx) => {
    // const users = await ctx.orm.user.findAll();
    // ctx.body = UserSerializer.serialize(users);
    // ctx.body = users;
    const apiJWT = await getManagementApiJWT();
    console.log(apiJWT);
    const options = { 
        // method: "GET",
        // url: "https://dev-prxndioi.us.auth0.com/api/v2/users",
        headers: { 
            'Authorization' : `Bearer ${apiJWT.access_token}`,
            'Content-Type': 'application/json'
        },
        };
    const url = "https://dev-prxndioi.us.auth0.com/api/v2/users";
    try {
        const req = axios.get(url, options);
        const res = await req;
        console.log(res);
        console.log(apiSerializer.serialize(res.data).data);
        // ctx.status = 201;
        ctx.body = apiSerializer.serialize(res.data);
    }
    catch (ValidationError) {
        console.log(ValidationError);
        ctx.throw(400, 'Bad request');
    }
})


router.get('api.users.show', '/:id', async(ctx) =>{
    // const user = await ctx.orm.user.findByPk(ctx.params.id);
    // if (!user) {
    //     ctx.throw(404, 'El usuario buscado no existe');
    // }
    // ctx.body = UserSerializer.serialize(user);

    const authId = ctx.params.id;
    const apiJWT = await getManagementApiJWT();
    const options = { 
        // method: "GET",
        // url: "https://dev-prxndioi.us.auth0.com/api/v2/users",
        params: {q: `user_id:"${authId}"`, search_engine: 'v3'},
        headers: { 
            'Authorization' : `Bearer ${apiJWT.access_token}`,
            'Content-Type': 'application/json'
        },
        };
    const url = "https://dev-prxndioi.us.auth0.com/api/v2/users";
    try {
        const req = axios.get(url, options);
        const res = await req;
        console.log(res.data);
        console.log(apiSerializer.serialize(res.data).data);
        // ctx.status = 201;
        // ctx.body = apiSerializer.serialize(res.data);
        if (res.data.length == 0) {
            ctx.throw(400)//, 'El usuario buscado no existe');
        }
        // else {
        //     // ctx.status = 201;
        ctx.body = apiSerializer.serialize(res.data);
        // }
    }
    catch (ValidationError) {
        console.log(ValidationError);
        ctx.throw(400, 'Bad request');
    }
});

router.get('api.users.indexes', '/indexes/:id', async (ctx) => {
    const { currentUser } = ctx.state;
    // const user2 = await ctx.orm.user.findByPk(ctx.params.id);
    const apiJWT = await getManagementApiJWT();
    const options = { 
        // method: "GET",
        // url: "https://dev-prxndioi.us.auth0.com/api/v2/users",
        params: {q: `user_id:"${ctx.params.id}"`, search_engine: 'v3'},
        headers: { 
            'Authorization' : `Bearer ${apiJWT.access_token}`,
            'Content-Type': 'application/json'
        },
        };
    const url = "https://dev-prxndioi.us.auth0.com/api/v2/users";
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

    const user2 = res.data;

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
        "ids": {'user_1': currentUser.sub, 'user_2': user2.user_id, 'pingId': ping.id },
        "sidi": {"positions_1": positions_array_1, "positions_2": positions_array_2},
        "siin" : {"tags_1":tags_array_1, "tags_2": tags_array_2}
        };

})

module.exports = router;