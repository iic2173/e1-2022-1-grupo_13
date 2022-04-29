// const KoaRouter = require('koa-router');

// // const hello = require('./routes/hello');
// const index = require('./routes/index');

// const router = new KoaRouter();

// router.use('/', index.routes());
// // router.use('/hello', hello.routes());

// require('dotenv').config();
const KoaRouter = require('koa-router');
// const jwt = require('koa-jwt');
const { setCurrentUser } = require('./middlewares/auth');
// const users = require('./routes/users');
// const usersJWT = require('./routes/usersJWT');
const auth = require('./routes/auth');
// const pingsJWT = require('./routes/pingsJWT');
const login = require('./routes/login');
const index = require('./routes/index');
const profile = require('./routes/profile');
const signin = require('./routes/users');
const map = require('./routes/map');

// const router = new KoaRouter({ prefix: '/api'});
const router = new KoaRouter();

// router.use(async (ctx, next) => {
//     try {
//       await next();
//     } catch (err) {
//       switch (err.status) {
//         case 401:
//           ctx.app.emit('error', err, ctx);
//           ctx.redirect(ctx.router.url('session.new'));
//           break;
//         default:
//           throw err;
//       }
//     }
//   });
router.use(setCurrentUser);

router.use(async (ctx, next) => {
    Object.assign(ctx.state, {
      paths: {
        destroySession: ctx.router.url('session.destroy'),
        newSession: ctx.router.url('session.new'),
        newUser: ctx.router.url('users.create'),
        myProfile: ctx.router.url('profile'),
        principal: ctx.router.url('index'),
        mapIndex: ctx.router.url('map.index'),
        newPos: ctx.router.url('map.new.position'),
        newPing: ctx.router.url('map.new.ping')
      },
    });
    return next();
  })

router.use('/', index.routes());
router.use('/signup', login.routes());
router.use('/signin', signin.routes());
router.use('/auth', auth.routes());
router.use('/profile', profile.routes());
router.use('/map', map.routes());
// router.use('/users', users.routes());

// Rutas protegidas
// router.use(jwt({ secret: process.env.JWT_SECRET, key:'authData' }));
// router.use(apiSetCurrentUser);
// router.use('/users', usersJWT.routes());
// router.use('/pings', pingsJWT.routes());


module.exports = router;
