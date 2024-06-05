const OrderModel = require("../../models/order.model");


async function EditOrderSuperAdminService(id, status) {
    try {
        const fetchOrderDetails = await OrderModel.findOne({ where: { id: id } });

        if (!fetchOrderDetails) {
            return {
                status: true,
                message: "Order not found"
            }
        }

        fetchOrderDetails.status = status;
        await fetchOrderDetails.save();

        return {
            status: true,
            message: "Order updated successfully"
        }
    } catch (error) {
        console.error("Error in editing orders", error.message);
        return {
            status: false,
            message: "An error occurred during editing orders. Please try again later."
        };
    }
}


module.exports = EditOrderSuperAdminService;