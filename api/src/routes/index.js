const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('index', '/', (ctx) => ctx.render(
  'index'
));

module.exports = router;