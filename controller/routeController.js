var authService = require('../services/AuthService');


exports.register = function(req, res){
    authService.register(req.body, function(err, result){
    if(err)
        res.send(err);
    res.send(result);
  })
};

exports.login = function(req, res){
    authService.login(req.body, function(err, result){
        if(err)
           res.send(err);
        res.send(result);
    })
};

exports.resetPassword = function(req, res){
    authService.resetPassword(req.body,function(err, result){
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

exports.createsession = function(req, res){
    authService.createsession(req.body, function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};

exports.deactivateUser = function(req, res){
    authService.deactivateUser(req.body, function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};

exports.deleteuser = function(req, res){
    authService.deleteUser(req.body, function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};


////// Following are still in progress
exports.logout = function(req, res){
    authService.logout(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
    req.logout();
};

exports.changepassword = function(req, res){
    authService.changePassword(req.body,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};

exports.validate_token = function(req, res){
    console.log(req.body.token);
    authService.validate(req.body.token,function(err, result){
        if(err)
            res.send(err.message);
        res.send(result);
    })
};
