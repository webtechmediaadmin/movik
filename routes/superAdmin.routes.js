const express = require('express');
const { RegisterSuperAdminController, LoginSuperAdminController, CreateAdminController } = require('../controllers/superAdmin.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const superAdminRoutes = express.Router();

superAdminRoutes.post('/super-admin-register', RegisterSuperAdminController);
superAdminRoutes.post('/super-admin-login', LoginSuperAdminController);
superAdminRoutes.post('/create-admin', authentication, authorize(["super-admin"]), CreateAdminController);


module.exports = superAdminRoutes;