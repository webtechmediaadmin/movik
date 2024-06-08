const express = require('express');
const { LoginManagerController, GetMyProfileController, GetManagerController, GetSpecificManagerController, DeleteManagerController } = require('../controllers/manager.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const managerRoutes = express.Router();

managerRoutes.post('/login-manager', LoginManagerController);
managerRoutes.get('/my-profile', authentication, authorize(["dealer", "distributor"]), GetMyProfileController);
managerRoutes.get('/', authentication, authorize(["super-admin", "admin"]), GetManagerController);
managerRoutes.get('/specific-manager', authentication, authorize(["super-admin", "admin"]), GetSpecificManagerController);
managerRoutes.delete('/delete-manager/:id', authentication, authorize(["super-admin", "admin"]), DeleteManagerController);


module.exports = managerRoutes;