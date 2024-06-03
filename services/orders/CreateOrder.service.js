const OrderModel = require("../../models/order.model");

async function CreateOrderService(managerID, productID, quantity, date) {
    try {
        const orderCreation = await OrderModel.create({managerID, productID, quantity, date});

        return {
            status: true,
            message: "Order created successfully",
            data: orderCreation
        }
    } catch (error) {
        console.error("Error in order creation", error.message);
        return {
            status: false,
            message: "An error occurred during order creation. Please try again later."
        };
    }
}


module.exports = CreateOrderService;