const express = require('express');
const { LoginManagerController } = require('../controllers/manager.controller');

const managerRoutes = express.Router();

managerRoutes.post('/login-manager', LoginManagerController);


module.exports = managerRoutes;