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


exports.login = function (body, callback) {
var userName = body.email;
var password = body.password;

}


exports.validate = function(token, callback) {

}


exports.profile = async function (body, callback) {
    console.log('Inside Okta dashboard');
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


exports.logout = function (body, callback) {
var userName = body.email;

}


exports.forgotPassword = function (body, callback) {
var userName = body.email;

}


exports.changePassword = function (body, callback) {
var userName = body.email;
var oldpassword = body.oldpassword;

}
