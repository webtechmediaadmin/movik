const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { CreateSalesController, GetSalesController, EditSalesController, DeleteSalesController, GetSalesAsAdminController, GetSalesAsPerManagerController } = require('../controllers/sales.controller');

const salesRoutes = express.Router();

salesRoutes.post('/create-sales', authentication, authorize(["dealer", "distributor"]), CreateSalesController);
salesRoutes.get('/get-sales', authentication, authorize(["super-admin", "admin", "dealer", "distributor"]), GetSalesController);
salesRoutes.patch('/edit-sales/:id', authentication, authorize(["dealer", "distributor"]), EditSalesController);
salesRoutes.delete('/delete-sales/:id', authentication, authorize(["dealer", "distributor"]), DeleteSalesController);
salesRoutes.get('/as-per-admin', authentication, authorize(["admin"]), GetSalesAsAdminController);
salesRoutes.get('/', authentication, authorize(["dealer","distributor"]), GetSalesAsPerManagerController);


module.exports = salesRoutes;