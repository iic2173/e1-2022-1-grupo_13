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
    jwtgenerator.sign(
      { 
        gty: 'client_credentials',
        client_id:"pxf46qhWlenYtz8Wd8Rdlufr6rnXwyae",
        client_secret:"eWhCLesFJElNXhK2L83raNSnVouz7vP21MalXR0Uvg9CenLhPiZwSNJAFPl1QPOO",
        aud: 'https://e2-arquisoft2.com',
        iss: "https://dev-prxndioi.us.auth0.com/",
        sub: user.id 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
    );
  });
}

router.post('api.auth.login', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email: email } });

  if (!user) ctx.throw(404, `No user found with mail ${email}`);

  const authenticated = await user.checkPassword(password);
  if (!authenticated) ctx.throw(401, 'Invalid password');

  // const token = await generateToken(user);

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

    
    // access_token: token,
    access_token: token,
    token_type: 'Bearer',
  };
});

module.exports = router;