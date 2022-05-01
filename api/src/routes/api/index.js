require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const {
    setCurrentUser,
} = require('../../middlewares/auth');
const workouts = require('./workouts');
const categories = require('./categories');
const routines = require('./routines');
const users = require('./users');
const auth = require('./auth');

const router = new KoaRouter({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.body = { message: 'e1-arqui API' };
});

/* Unprotected routes */
router.use('/auth', auth.routes());
router.use('/workouts', workouts.routes());
router.use('/categories', categories.routes());
router.use('/routines', routines.routes());
router.use('/users', users.routes());

/* Protected routes */
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(setCurrentUser);

module.exports = router;