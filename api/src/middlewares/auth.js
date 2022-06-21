require('dotenv').config();

const jwt = require('jsonwebtoken');
var jwt_koa = require('koa-jwt');
var jwks = require('jwks-rsa');
const axios = require('axios');

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

// async function setCurrentUser(ctx, next) {
//   if (ctx.session.currentUserId) {
//     ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
//   }
//   return next();
// }
// const jwtCheck = jwt_koa({
//   secret: jwks.koaJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
// }),
// audience: [
//   `${process.env.AUTH0_AUDIENCE}`,
//   `https://${process.env.AUTH0_DOMAIN}/userinfo`
// ],
// issuer: `https://${process.env.AUTH0_DOMAIN}`,
// algorithms: ['RS256']
// });

const jwtCheck = jwt_koa({
  secret: jwks.koaJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-prxndioi.us.auth0.com/.well-known/jwks.json'
}),
audience: [
  "https://e3-arquisoft.com",
  "https://dev-prxndioi.us.auth0.com/userinfo"
],
issuer: 'https://dev-prxndioi.us.auth0.com/',
algorithms: ['RS256']
});

const getManagementApiJWT = () => {
  var request = require("request");
  return new Promise(function (resolve, reject) {
      var options = { method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{"client_id":"${process.env.AUTH0_CLIENT_ID}","client_secret":"${process.env.AUTH0_CLIENT_SECRET}","audience":"https://${process.env.AUTH0_DOMAIN}/api/v2/","grant_type":"client_credentials","scope":"read:users"}` };

      request(options, function (error, response, body) {
      if (error) {
          reject(error);
      }
      else {
          resolve(JSON.parse(body));
      }
      });
  })
  
}

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
  // const authData = ctx.state;
  // if (authData) {
  //   ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
  // }
  // return next();

  const authData = ctx.state;
  const infoCurrentUser = authData.aud[1];
  if (infoCurrentUser) {
    const apiJWT = ctx.get('Authorization').split(' ')[1];
    // console.log(apiJWT);
    // ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
    const options = { 
      headers: { 
        'Authorization' : `Bearer ${apiJWT}`,
      },
    };
    // console.log(infoCurrentUser);
    try {
      const req = axios.get(infoCurrentUser, options);
      const res = await req;
      // console.log(res.data);
      // console.log(apiSerializer.serialize(res.data).data);
      // ctx.status = 201;
      // ctx.body = apiSerializer.serialize(res.data);
      ctx.state.currentUser = res.data;
    }
    catch (ValidationError) {
      console.log(ValidationError);
      ctx.throw(400, 'Bad request');
    }
  }
  // console.log(ctx.state)
  return next();
}

module.exports = {
  checkAuth,
  setCurrentUser,
  decodeJWT,
  jwtCheck,
  getManagementApiJWT
};