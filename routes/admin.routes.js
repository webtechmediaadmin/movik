const express = require('express');
const { LoginAdminController, CreateManagerController, GetMyProfileController, UpdateAdminDetailsController } = require('../controllers/admin.controller');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');

const adminRoutes = express.Router();

adminRoutes.post('/login-admin', LoginAdminController);
adminRoutes.post('/create-manager', authentication, authorize(["admin","super-admin"]), CreateManagerController);
adminRoutes.get('/my-profile', authentication, authorize(["admin"]), GetMyProfileController);
adminRoutes.patch('/update-my-profile', authentication, authorize(["admin"]), UpdateAdminDetailsController)


module.exports = adminRoutes;