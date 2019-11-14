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
    let token = await oktaService.login(userName,password);
    callback(token);
}

exports.resetPassword = async function (body, callback) {
    console.log('Inside AuthService - resetPassword');
    var userName = body.email;
    let user = await oktaService.resetPassword(userName);
    if (user === undefined)
    {
        console.error("User not found:", userName);
    }
    callback(user);
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

exports.createsession = async function (body, callback) {
    var token = body.token;
    let session = await oktaService.createSession(token);
    if (session === undefined)
    {
        console.error("Unable to create a session");
    }
    callback(session);
}

exports.deactivateUser = async function (body, callback) {
    var userName = body.email;
    await oktaService.deactivateUser(userName);
    console.log("User locked-out successfully : ", userName );
    callback();
}

exports.deleteUser = async function (body, callback) {
    var userName = body.email;
    await oktaService.deleteUser(userName);
    console.log("User deleted successfully : ", userName );
    callback();
}


// The following endpoints are still in-progress
exports.logout = async function (body, callback) {
    var userName = body.email;
    await oktaService.logout();
    console.log("User deactivate successfully",userName );
    callback();
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

exports.validate = async function(token, callback) {
    let data = await oktaService.verifyToken(token);
    if (data === undefined)
    {
        console.error("Token could not be verified");
    }
    callback(data);
}