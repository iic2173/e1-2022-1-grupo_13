const jwt = require('jsonwebtoken');

function checkAuth(ctx, next) {
  const { currentUser } = ctx.state;
  if (!currentUser) ctx.throw(401);
  return next();
}

// async function setCurrentUser(ctx, next) {
//   if (ctx.session.currentUserId) {
//     ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
//   }
//   return next();
// }

function decodeJWT (ctx, next) {
  const token_complete = ctx.get('Authorization');
  // console.log("---------------------------------------------")
  // console.log(token_complete);
  const token_list = token_complete.split(' ');
  // console.log(token_list[1]);
  var decoded = jwt.decode(token_list[1], {complete: true});
  // console.log(decoded.header);
  // console.log(decoded.payload)
  // console.log("---------------------------------------------")
  ctx.state = decoded.payload;
  return next();
};

async function setCurrentUser(ctx, next) {
  const authData = ctx.state;
  if (authData) {
    ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
  }
  return next();
}

module.exports = {
  checkAuth,
  setCurrentUser,
  decodeJWT
};