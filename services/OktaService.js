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
  }
  catch(err)
  {
    console.error("No user found with username: ", userName);
  }
  return(user);
}

exports.register = async function (firstname,lastname,email,password) {
  console.log('Calling okta createUser()');
  try {
    await client.createUser({
      profile: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        login: email,
      },
      credentials: {
        password: {
          value: password,
        },
      }
    });
  }
  catch (err){
    console.error("Could not complete the registeration for user: ", email);
  }
  return;
}

exports.forgotPassword = async function (userName) {
  console.log('Calling okta resetPassword()');
  let user;
  try{
    user = await client.getUser(userName);
    if (user != null){
      await user.resetPassword();
    }
  }
  catch(err)
  {
    console.error(err);
    if (user===undefined){
      console.error("No user found with username: ", userName);
    }
    else {
      console.error("Unable to reset the password for the user : ", userName);
    }
  }
  return(user);
}
