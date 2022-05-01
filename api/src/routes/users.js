const KoaRouter = require('koa-router');
// const jwt = require('koa-jwt');
// const {apiSetCurrentUser } = require('../../middlewares/auth');

// const JSONAPISerializer = require('jsonapi-serializer').Serializer

// const UserSerializer = new JSONAPISerializer( 'user', {
//     attributes: ['email', 'nickname', 'phone_num', 'telegram_user', 'password'],
//     keyForAttribute: 'camelCase',
// });

const router = new KoaRouter();

router.get('users.new', '/', async (ctx) => {
    const user = ctx.orm.user.build(ctx.request.body);
    await ctx.render('session/signin', {
      user,
      newUserPath: ctx.router.url('users.create'),
    });
  });

router.post('users.create', '/', async (ctx) => {
    const user = ctx.orm.user.build(ctx.request.body);
    try {
        // console.log(user)
        await user.save({ fields: ['email', 'nickname', 'phone_num', 'telegram_user', 'password']});
        console.log(user)
        ctx.session.currentUserId = user.id;
        console.log(ctx.state.currentUser)
        console.log(ctx.state)
        ctx.redirect('/');
    } catch (ValidationError) {
      await ctx.render('session/signin', {
        user,
        errors: ValidationError.errors,
        newUserPath: ctx.router.url('users.create')
      });
    }
  });



module.exports = router;