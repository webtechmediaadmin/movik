const OrderModel = require("../../models/order.model");


async function DeleteOrderService(id) {
    try {
        const deleteOrderDetails = await OrderModel.findOne({ where: { id: id } });

        if (!fetchOrderDetails) {
            return {
                status: true,
                message: "Order not found"
            }
        }

        await deleteOrderDetails.destroy();

        return {
            status: true,
            message: "Order deleted successfully"
        }
    } catch (error) {
        console.error("Error in editing orders", error.message);
        return {
            status: false,
            message: "An error occurred during editing orders. Please try again later."
        };
    }
}


module.exports = DeleteOrderService;