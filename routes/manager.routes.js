const express = require('express');
const { LoginManagerController, GetMyProfileController } = require('../controllers/manager.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const managerRoutes = express.Router();

managerRoutes.post('/login-manager', LoginManagerController);
managerRoutes.get('/my-profile', authentication, authorize(["admin"]), GetMyProfileController);

module.exports = managerRoutes;