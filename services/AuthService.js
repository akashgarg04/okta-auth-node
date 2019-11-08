// global.fetch = require('node-fetch');
// global.navigator = () => null;
// const config = require ('config');
// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');

const oktaService = require('./OktaService');

exports.register = function (body, callback) {
var name = body.name;
var email = body.email;
var password = body.password;

if (body.question.length <= 0 || 
    body.answer.length <= 0   ||
    name.length <= 0          ||
    email.length <= 0         ||
    password.length <= 0
)
{
    return(500);
}

var attributeList = [];
        
var dataEmail = {
    Name : 'email', 
    Value : email
};

var dataPersonalName = {
    Name : 'name', 
    Value : name
};

var question = {
    Name : 'custom:question', 
    Value : body.question
};

var answer = {
    Name : 'custom:answer', 
    Value : body.answer
};

var failedcount = {
    Name : 'custom:failattempts', 
    Value : '0'
};

}


exports.login = function (body, callback) {
var userName = body.email;
var password = body.password;

}


exports.validate = function(token, callback) {

}


exports.profile = function (body, callback) {
    console.log('Inside Okta dashboard');
    let user = oktaService.profile(body.email);
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
