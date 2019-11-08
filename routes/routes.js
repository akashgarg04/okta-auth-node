var express = require('express');
var router = express.Router();
var authController = require('../controller/routeController');

// Auth endpoints using okta
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/validate', authController.validate_token);
router.get('/auth/profile', authController.user_profile);
router.post('/auth/logout', authController.logout);
router.post('/auth/forgotpassword', authController.forgotpassword);
router.post('/auth/changepassword', authController.changepassword);
// router.post('/auth/dashboard', authController.dashboard);

module.exports = router;