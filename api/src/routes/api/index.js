require('dotenv').config();
const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');
const {
    setCurrentUser,
} = require('../../middlewares/auth');
const map = require('./map');
const pings = require('./pingsJWT');
const users = require('./usersJWT');
const auth = require('./auth');
const weather = require('./weather');

const router = new KoaRouter({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.body = { message: 'e1-arqui API' };
});

/* Unprotected routes */
router.use('/auth', auth.routes());
router.use('/map', map.routes());
router.use('/pings', pings.routes());
router.use('/users', users.routes());
router.use('/weather', weather.routes());

/* Protected routes */
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(setCurrentUser);

module.exports = router;