const ManagerModel = require("../../models/manager.model");
const ProductModel = require("../../models/product.model");
const SalesModel = require("../../models/sales.model");


async function GetSalesAsPerManager(managerID) {
    try {
        const sales = await SalesModel.findAll({
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
            data: sales
        }
    } catch (error) {
        console.error("Error in fetching orders", error.message);
        return {
            status: false,
            message: "An error occurred during fetching orders. Please try again later."
        };
    }
}


module.exports = GetSalesAsPerManager;