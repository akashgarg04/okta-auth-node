var express = require('express');
var router = express.Router();
var authController = require('../controller/routeController');

// Auth endpoints using okta
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/resetPassword', authController.resetPassword);
router.get('/auth/profile', authController.user_profile);
router.post('/auth/createsession', authController.createsession);
router.post('/auth/deactivateUser', authController.deactivateUser);
router.post('/auth/deleteuser', authController.deleteuser);

// Following are in-progress
router.post('/auth/logout', authController.logout);
router.post('/auth/changepassword', authController.changepassword);
router.post('/auth/validate', authController.validate_token);

module.exports = router;