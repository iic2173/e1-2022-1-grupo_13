const KoaRouter = require('koa-router');

const JSONAPISerializer = require('jsonapi-serializer').Serializer

const UserSerializer = new JSONAPISerializer( 'user', {
    attributes: ['email', 'nickname', 'phone_num', 'telegram_user', 'password'],
    keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.post('api.users.create', '/', async(ctx) => {
    try {
        const user = ctx.orm.user.build(ctx.request.body);
        await user.save({ fields: ['email', 'nickname', 'phone_num', 'telegram_user', 'password']});
        ctx.status = 201;
        ctx.body = UserSerializer.serialize(user);
        ctx.body = user;
    } catch (ValidationError) {
        ctx.throw(400, 'Bad Request');
    }
});

router.get("api.users.list", "/", async (ctx) => {
    const users = await ctx.orm.user.findAll();
    // ctx.body = UserSerializer.serialize(users);
    ctx.body = users;

})

router.get('api.users.show', '/:id', async(ctx) =>{
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404, 'El usuario buscado no existe');
    }
    ctx.body = UserSerializer.serialize(user);
});

router.get('api.users.addpic', '/:id/images', async(ctx) =>{
    const user = await ctx.orm.user.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404, 'El usuario buscado no existe');
    }
    ctx.body = UserSerializer.serialize(user);
});

module.exports = router;