const ManagerModel = require("../../models/manager.model");
const OrderModel = require("../../models/order.model");
const ProductModel = require("../../models/product.model");

async function GetOrderAsPerManager(managerID) {
    try {
        const orderList = await OrderModel.findAll({
            where: { managerID: managerID }, include: [
                {
                    model: ManagerModel
                },
                {
                    model: ProductModel
                }
            ]
        })

        return {
            status: true,
            message: "List of all the orders",
            data: orderList
        }
    } catch (error) {
        console.error("Error in fetching orders", error.message);
        return {
            status: false,
            message: "An error occurred during fetching orders. Please try again later."
        };
    }
}


module.exports = GetOrderAsPerManager;