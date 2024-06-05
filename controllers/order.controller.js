const CreateOrderService = require("../services/orders/CreateOrder.service");
const DeleteOrderService = require("../services/orders/DeleteOrder.service");
const EditOrderService = require("../services/orders/EditOrder.service");
const EditOrderSuperAdminService = require("../services/orders/EditOrderSuperAdmin.service");
const GetOrderService = require("../services/orders/GetOrder.service");

async function CreateOrderController(req, res) {
    try {
        const { productID, quantity, date } = req.body;
        const managerID = req.userID;

        const orderCreation = await CreateOrderService(managerID, productID, quantity, date);

        return res.status(orderCreation.status ? 200 : 404).json({
            status: orderCreation.status,
            message: orderCreation.message,
            data: orderCreation.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetOrderController(req, res) {
    try {
        const { id, managerID, productID, status } = req.query;

        const fetchOrder = await GetOrderService(id, managerID, productID, status);

        return res.status(fetchOrder.status ? 200 : 404).json({
            status: fetchOrder.status,
            message: fetchOrder.message,
            data: fetchOrder.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditOrderController(req, res) {
    try {
        const id = req.params.id;
        const quantity = req.body;

        const editOrder = await EditOrderService(id, quantity);

        return res.status(editOrder.status ? 200 : 404).json({
            status: editOrder.status,
            message: editOrder.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditOrderSuperAdminController(req, res) {
    try {
        const id = req.params.id;
        const status = req.body;

        const editOrder = await EditOrderSuperAdminService(id, status);

        return res.status(editOrder.status ? 200 : 404).json({
            status: editOrder.status,
            message: editOrder.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function DeleteOrderController(req, res) {
    try {
        const id = req.params.id;

        const deleteOrder = await DeleteOrderService(id);

        return res.status(deleteOrder.status ? 200 : 404).json({
            status: deleteOrder.status,
            message: deleteOrder.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { CreateOrderController, GetOrderController, EditOrderController, EditOrderSuperAdminController, DeleteOrderController };