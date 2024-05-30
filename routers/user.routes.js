const express = require('express');
const { EmailRegistrationController, EmailLoginController, UserLogoutController } = require('../controllers/user.controller');

const userRoutes = express.Router();


userRoutes.post('/register', EmailRegistrationController);
userRoutes.post('/login', EmailLoginController);
userRoutes.post('/logout', UserLogoutController);

module.exports = userRoutes;