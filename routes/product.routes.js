const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { authorize } = require('../middleware/authorization.middleware');
const { CreateProductController, EditProductController, DeleteProductController, GetProductController, upload, StatusChangeController } = require('../controllers/product.controller');

const productRoutes = express.Router();

productRoutes.post('/create-product', authentication, authorize(["super-admin"]), upload.single('image'), CreateProductController);
productRoutes.patch('/edit-product/:id', authentication, authorize(["super-admin"]), upload.single('image'), EditProductController);
productRoutes.delete('/delete-product/:id', authentication, authorize(["super-admin"]), DeleteProductController);
productRoutes.get('/get-product', GetProductController);
productRoutes.post('/status-changer/:id', authentication, authorize(["super-admin"]), StatusChangeController);



module.exports = productRoutes;