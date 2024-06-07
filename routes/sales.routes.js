const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { CreateOrderController, GetOrderController, EditOrderController, EditOrderSuperAdminController } = require('../controllers/order.controller');
const { CreateSalesController, GetSalesController, EditSalesController, DeleteSalesController, GetSalesAsAdminController } = require('../controllers/sales.controller');

const salesRoutes = express.Router();

salesRoutes.post('/create-sales', authentication, authorize(["dealer", "distributor"]), CreateSalesController);
salesRoutes.get('/get-sales', authentication, authorize(["super-admin", "admin", "dealer", "distributor"]), GetSalesController);
salesRoutes.patch('/edit-sales/:id', authentication, authorize(["dealer", "distributor"]), EditSalesController);
salesRoutes.delete('/delete-sales/:id', authentication, authorize(["dealer", "distributor"]), DeleteSalesController);
salesRoutes.get('/as-per-admin', authentication, authorize(["admin"]), GetSalesAsAdminController);


module.exports = salesRoutes;