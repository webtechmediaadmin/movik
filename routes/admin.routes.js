const express = require('express');
const { LoginAdminController, CreateManagerController, GetMyProfileController } = require('../controllers/admin.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const adminRoutes = express.Router();

adminRoutes.post('/login-admin', LoginAdminController);
adminRoutes.post('/create-manager', authentication, authorize(["admin"]), CreateManagerController);
adminRoutes.get('/my-profile', authentication, authorize(["admin"]), GetMyProfileController);


module.exports = adminRoutes;