const express = require('express');
const { LoginManagerController, GetMyProfileController, GetManagerController } = require('../controllers/manager.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const managerRoutes = express.Router();

managerRoutes.post('/login-manager', LoginManagerController);
managerRoutes.get('/my-profile', authentication, authorize(["dealer","distributor"]), GetMyProfileController);
managerRoutes.get('/', authentication, authorize(["super-admin", "admin"]), GetManagerController);


module.exports = managerRoutes;