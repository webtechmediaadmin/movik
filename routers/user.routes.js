const express = require('express');
const { EmailRegistrationController, EmailLoginController } = require('../controllers/user.controller');

const userRoutes = express.Router();


userRoutes.post('/register', EmailRegistrationController);
userRoutes.post('/login', EmailLoginController);

module.exports = userRoutes;