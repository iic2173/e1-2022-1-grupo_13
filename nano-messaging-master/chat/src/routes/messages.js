const jRouter = require('koa-joi-router');

const router = jRouter();

router.route({
    method: 'get',
    path: '/history',
    validate: {},
    handler: async(ctx) => {
        const messages = await ctx.orm.Message.findAll();
        ctx.status = 200;
        ctx.response.json = messages;

    }
})

module.exports = router;
