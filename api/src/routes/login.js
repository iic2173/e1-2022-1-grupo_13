const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/', (ctx) => ctx.render(
  'session/signup', {
    submitPath: ctx.router.url('session.create'),
  },
));

router.post('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });
  
  const authenticated = user && await user.checkpassword(password);
  if (user && authenticated) {
    ctx.session.currentUserId = user.id;
    ctx.redirect('/profile');
  } else {
    await ctx.render('session/signup', {
      error: 'Email y/o contraseña incorrectos',
      email,
      submitPath: ctx.router.url('session.create'),
    });
  }
});

router.delete('session.destroy', '/', (ctx) => {
  ctx.session.currentUserId = null;
  ctx.redirect('/');
});

module.exports = router;