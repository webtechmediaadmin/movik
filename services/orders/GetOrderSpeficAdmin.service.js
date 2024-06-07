const ManagerModel = require("../../models/manager.model");
const OrderModel = require("../../models/order.model");
const ProductModel = require("../../models/product.model");

async function GetSpecificOrderAdminService(adminID) {
    try {
        const orderData = await OrderModel.findAll({
            include: [
                {
                    model: ManagerModel,
                    where: { adminID: adminID }
                },
                { model: ProductModel }
            ]
        });

        return {
            status: true,
            message: "Order data as per request.",
            data: orderData
        }
    } catch (error) {
        console.error("Error in fetching orders report.", error.message);
        return {
            status: false,
            message: "An error occurred during fetching orders report. Please try again later."
        };
    }
}


module.exports = GetSpecificOrderAdminService;