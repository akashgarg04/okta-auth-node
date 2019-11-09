var authService = require('../services/AuthService');

exports.register = function(req, res){
    authService.register(req.body, function(err, result){
    if(err)
        res.send(err);
    res.send(result);
  })
};


exports.login = function(req, res){
    let login = authService.login(req.body, function(err, result){
        if(err)
           res.send(err);
        res.send(result);
    })
 };


exports.validate_token = function(req, res){
    let validate = authService.validate(req.body.token,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};


exports.user_profile = function(req, res){
    authService.profile(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};


exports.logout = function(req, res){
    let logout = authService.logout(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};


exports.forgotpassword = function(req, res){
    authService.forgotPassword(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};


exports.changepassword = function(req, res){
    let changepassword = authService.changePassword(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};
