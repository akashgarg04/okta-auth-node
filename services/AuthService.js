// global.fetch = require('node-fetch');
// global.navigator = () => null;
// const config = require ('config');
// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');

const oktaService = require('./OktaService');

exports.register = async function (body, callback) {
    var firstname = body.firstname;
    var lastname = body.lastname;
    var email = body.email;
    var password = body.password;

    if (firstname.length <= 0   ||
        lastname.length <= 0    ||
        email.length <= 0       ||
        password.length <= 0 )
    {
        console.log("Invalid input for registration");
        return(500);
    }
    else {
        await oktaService.register(firstname,lastname,
            email,password);
        console.log("Registration successful for user: ", email);
    }
    callback();
}

exports.login = async function (body, callback) {
    var userName = body.email;
    var password = body.password;
    var session;
    let token = await oktaService.login(userName,password);
    if (token === undefined)
    {
        console.error("Unable to login user :", userName);
    }
    else {
        session = await oktaService.createSession(token.sessionToken);
    }
    callback(session);
}

exports.validate = async function(token, callback) {
    let data = await oktaService.verifyToken(token);
    if (data === undefined)
    {
        console.error("Token could not be verified");
    }
    callback(data);
}

exports.profile = async function (body, callback) {
    console.log('Inside AuthService - profile');
    let user = await oktaService.profile(body.email);
    if (user === undefined)
    {
        console.error("User not found");
    }
    else {
        console.log("user ID: " , user.id);
        console.log("user name: " , user.profile.firstName, " " ,  user.profile.lastName);
        console.log("User email: ", user.profile.email);
    }
    callback(user);
}

exports.logout = async function (body, callback) {
    var userName = body.email;
    await oktaService.logout();
    callback();
}

exports.forgotPassword = async function (body, callback) {
    console.log('Inside AuthService - forgotpassword');
    var userName = body.email;
    let user = await oktaService.forgotPassword(userName);
    if (user === undefined)
    {
        console.error("User not found:", userName);
    }
    callback(user);
}

exports.changePassword = async function (body, callback) {
    var userName = body.email;
    var oldpassword = body.oldpassword;
    let user = await oktaService.changePassword(userName,oldpassword);
    if (user === undefined)
    {
        console.error("User not found:", userName);
    }
    callback(user);
}
