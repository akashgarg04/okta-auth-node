const { ExpressOIDC } = require('@okta/oidc-middleware')
const session = require('express-session')
const okta = require('@okta/okta-sdk-nodejs')

const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
});

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.USER_PROFILE_TOKEN,
})

exports.oidc = oidc;
exports.client = client;

exports.profile = async function (userName) {
  console.log('Calling okta getuser()');
  let user;
  try{
    user = await client.getUser(userName);
      // .then(user => {
      //   console.log(user);
      // });
  }
  catch(err)
  {
    console.error("No user found with username: ", userName);
  }
  return(user);
}