const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { CreateOrderController, GetOrderController, EditOrderController, DeleteOrderController } = require('../controllers/order.controller');

const orderRoutes = express.Router();

orderRoutes.post('/create-orders', authentication, authorize(["dealers", "distributors"]), CreateOrderController);
orderRoutes.get('/get-orders', authentication, authorize(["dealers", "distributors"]), GetOrderController);
orderRoutes.patch('/edit-orders/:id', authentication, authorize(["dealers", "distributors"]), EditOrderController);


module.exports = orderRoutes;