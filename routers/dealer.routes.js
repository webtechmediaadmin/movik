const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { DealerRegisterController, DealerLoginController, DealerLogoutController } = require('../controllers/dealer.controller');

const dealerRoutes = express.Router();


dealerRoutes.post('/register', authentication, DealerRegisterController);
dealerRoutes.post('/login', DealerLoginController);
dealerRoutes.post('/logout', DealerLogoutController);

module.exports = dealerRoutes;