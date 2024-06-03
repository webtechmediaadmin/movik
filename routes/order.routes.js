const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { CreateOrderController, GetOrderController, EditOrderController } = require('../controllers/order.controller');

const orderRoutes = express.Router();

orderRoutes.post('/create-orders', authentication, authorize(["dealer", "distributor"]), CreateOrderController);
orderRoutes.get('/get-orders', authentication, authorize(["dealer", "distributor"]), GetOrderController);
orderRoutes.patch('/edit-orders/:id', authentication, authorize(["dealer", "distributor"]), EditOrderController);


module.exports = orderRoutes;