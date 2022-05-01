// Autenticacion de sesion
require('dotenv').config();
const KoaRouter = require('koa-router');
const jwtgenerator = require('jsonwebtoken');

const router = new KoaRouter();

function generateToken(user) {
    return new Promise((resolve, reject) => {
      jwtgenerator.sign(
        { sub: user.id },
        process.env.JWT_SECRET,
        // { expiresIn: 60 * 30 },
        (err, tokenResult) => (err ? reject(err) : resolve(tokenResult)),
      );
    });
  }


router.post('api.auth.login', '/', async(ctx) => {
    const { email,password }  =ctx.request.body;
    const user = await ctx.orm.user.findOne( { where: { email } });
    if (!user) ctx.throw(404, `No se ha encontrado un usuario con ${email}` );
    const authenticated = await user.checkpassword(password);
    if (!authenticated) ctx.throw(401, 'Contraseña invalida');
    try {
        const token = await generateToken(user);
        ctx.body = {
            access_token: token,
            token_type: 'Bearer',
        };
    } catch (error) {
        ctx.throw(500);
    }
});

module.exports = router;