//const { ExpressOIDC } = require('@okta/oidc-middleware');
//let session = require('express-session');
const okta = require('@okta/okta-sdk-nodejs');
const OktaAuth = require ('@okta/okta-auth-js');
const OktaJwtVerifier = require ('@okta/jwt-verifier');

// const oidc = new ExpressOIDC({
//   issuer: `${process.env.ORG_URL}/oauth2/default`,
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
//   redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
//   scope: 'openid profile',
// });

const client = new okta.Client({
  orgUrl: process.env.ORG_URL,
  token: process.env.USER_PROFILE_TOKEN,
})

const oktaAuthClient = new OktaAuth({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
});

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  clientId: process.env.CLIENT_ID
});


exports.register = async function (firstname,lastname,email,password) {
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
    console.error(err);
    console.error("Could not complete the registeration for user: ", email);
  }
  return;
}

exports.login = async function (username, password)
{
  let successfulLogin;
  try {
    successfulLogin  =  await oktaAuthClient.signIn({ username, password });
    console.log(successfulLogin);
  }
  catch(err)
  {
    console.error(err);
    console.error("Could not login username: ", username);
  }
  return(successfulLogin);
}

exports.resetPassword = async function (userName) {
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

exports.profile = async function (userName) {
  let user;
  try{
    user = await client.getUser(userName);
    console.log(user);
  }
  catch(err)
  {
    console.error(err);
    console.error("No user found with username: ", userName);
  }
  return(user);
}

exports.createSession = async function (sessionToken) {
  let session;
  try {
    session = await client.createSession({
        sessionToken: sessionToken
    });
    console.log('Session details:', session)
  }
  catch (err){
    console.error(err);
    console.error('Unable to create Session');
  }
  // client.getSession(session.id)
  //   .then(session => {
  //     console.log('Session details:', session);
  //   });

  // client.endSession(session.id)
  //   .then(() => {
  //     console.log('Session ended');
  //   });
  return(session);
}

exports.deactivateUser = async function (userName)
{
  try {
    const user = await client.getUser(userName);
    console.log(user);
    await user.deactivate()
      .then(() => console.log('User has been deactivated'));
  }
  catch(err)
  {
    console.error(err);
    if (user===undefined){
      console.error("No user found with username: ", userName);
    }
    else {
      console.error("Could not deactivate username: ", userName);
    }
  }
  return;
}

exports.deleteUser = async function (userName)
{
  try {
    const user = await client.getUser(userName);
    await user.delete()
      .then(() => console.log('User has been deleted'));
  }
  catch(err)
  {
    console.error(err);
    if (user===undefined){
      console.error("No user found with username: ", userName);
    }
    else {
      console.error("Could not delete username: ", userName);
    }
  }
  return;
}


// The following endpoints are still in-progress
exports.logout = async function ()
{
  try {
    await oktaAuthClient.signOut()
    .then(function() {
      console.log('successfully logged out');
    })
    .fail(function(err) {
      console.error(err);
    });
  }
  catch(err)
  {
    console.error("Could not logout user", err);
  }
  return;
}

exports.changePassword = async function (userName) {
  console.log('Calling okta changePassword()');
  let user;
  try{
    user = await client.getUser(userName);
    if (user != null){
      //await user.changePassword();
    }
  }
  catch(err)
  {
    console.error(err);
    if (user===undefined){
      console.error("No user found with username: ", userName);
    }
    else {
      console.error("Unable to change the password for the user : ", userName);
    }
  }
  return(user);
}

exports.verifyToken = async function (token)
{
  try {
    const  isVerifiedToken  = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
    console.log(isVerifiedToken);
    return(isVerifiedToken);
  }
  catch(err)
  {
    console.error("Could not validate token", err);
  }
}
