const { ExpressOIDC } = require('@okta/oidc-middleware');
var session = require('express-session');
const okta = require('@okta/okta-sdk-nodejs');
const OktaAuth = require ('@okta/okta-auth-js');
const OktaJwtVerifier = require ('@okta/jwt-verifier');

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

const oktaAuthClient = new OktaAuth({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
});


const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  clientId: process.env.CLIENT_ID
});


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

// exports.changePassword = async function (userName) {
//   console.log('Calling okta changePassword()');
//   let user;
//   try{
//     user = await oktaAuthClient.getUser(userName);
//     if (user != null){
//       //await user.changePassword();
//     }
//   }
//   catch(err)
//   {
//     console.error(err);
//     if (user===undefined){
//       console.error("No user found with username: ", userName);
//     }
//     else {
//       console.error("Unable to change the password for the user : ", userName);
//     }
//   }
//   return(user);
// }

exports.createSession = async function (sessionToken) {
  console.log('Calling okta createSession()');
  var session;
  try {
    session = await client.createSession({
        sessionToken: sessionToken
      });
      console.log('Session details:', session)
  }
  catch (err){
      console.error('Unable to create Session');
  };
  // client.getSession(session.id)
  //   .then(session => {
  //     console.log('Session details:', session);
  //   });

  // client.endSession(session.id)
  //   .then(() => {
  //     console.log('Session ended');
  //   });
}

exports.login = async function (username, password)
{
  try {
    const  sessionToken  = await oktaAuthClient.signIn({ username, password });
    console.log(sessionToken);
    console.log(sessionToken.sessionToken);
    return(sessionToken);
  }
  catch(err)
  {
    console.error("Could not login username: ", username);
  }
}

exports.logout = async function ()
{
  try {
    await oktaAuthClient.signOut();
  }
  catch(err)
  {
    console.error("Could not logout user", err);
  }
  return;
}

// exports.verifyToken = async function (token)
// {
//   try {
//     const  isVerifiedToken  = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
//     console.log(isVerifiedToken);
//     return(isVerifiedToken);
//   }
//   catch(err)
//   {
//     console.error("Could not validate token", err);
//   }
// }

exports.lockUser = async function (userName)
{
  try {
    const user = await oktaAuthClient.getUser(userName);
    await user.deactivate()
      .then(() => console.log('User has been deactivated'))
      //.then(() => user.delete())
      //.then(() => console.log('User has been deleted'));
  }
  catch(err)
  {
    console.error("Could not deactivate username: ", username);
  }
  return;
}