const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get("api.tags.list", "/", async (ctx) => {
    const tags = await ctx.orm.tag.findAll();
    ctx.body = tags;

});

module.exports = router;
