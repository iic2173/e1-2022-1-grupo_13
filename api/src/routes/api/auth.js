const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');
const axios = require("axios").default;

const router = new KoaRouter();

// function generateToken(user) {
//   return new Promise((resolve, reject) => {
//     jwtgenerator.sign(
//       { sub: user.id },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' },
//       (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
//     );
//   });
// }

function generateToken(user) {
  return new Promise((resolve, reject) => {
    const options = {
        method: 'POST',
        url: 'https://dev-prxndioi.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/json'},
        data: {
          grant_type: 'client_credentials',
          client_id: 'W7RzdDQ93dqI7vPoumujUYmd10m5Fq11',
          client_secret: 'rOEox7ZvyCsyGpgGIxZuQ716qxd9NqdTU_Jx80imhsXotDhZBdC4Q2briqwOxxD6',
          audience: 'https://e2-arquisoft'
        }
      };

    const sendReq = async()  => {
      try {
        const req = axios(options);
        const token = await req;
        console.log("Token")
        console.log(token.data.access_token);
        jwtgenerator.sign(
          { sub: user.id },
          token.data.access_token,
          { expiresIn: '1h' },
          (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
        );
      }
      catch (err) {
        console.error(err);
      }
    }
    sendReq();
  });
}

router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email: email } });

  if (!user) ctx.throw(404, `No user found with mail ${email}`);

  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');

  const token = await generateToken(user);

  const {
    id, nickname, phone_num, telegram_user
  } = user.dataValues;

  ctx.body = {
    id,
    email,
    nickname,
    phone_num,
    telegram_user,

    
    access_token: token,
    token_type: 'Bearer',
  };
});

module.exports = router;