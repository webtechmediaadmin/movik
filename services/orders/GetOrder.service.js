const ManagerModel = require("../../models/manager.model");
const OrderModel = require("../../models/order.model");
const ProductModel = require("../../models/product.model");

async function GetOrderService(id, managerID, productID, status) {
    try {
        let whereQuery = {};

        if (id) {
            whereQuery.id = id;
        }

        if (managerID) {
            whereQuery.managerID = managerID;
        }

        if (productID) {
            whereQuery.productID = productID;
        }

        if (status) {
            whereQuery.status = status;
        }

        const orderList = await OrderModel.findAll({
            where: whereQuery,
            include: [
                { model: ProductModel },
                { model: ManagerModel }
            ]
        });

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


module.exports = GetOrderService;