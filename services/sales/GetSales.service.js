const ManagerModel = require("../../models/manager.model");
const ProductModel = require("../../models/product.model");
const SalesModel = require("../../models/sales.model");

async function GetSalesService(id, managerID) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (managerID) {
            whereClause.managerID = managerID;
        }

        const salesData = await SalesModel.findAll({
            where: whereClause,
            include: [{
                model: ManagerModel
            }, { model: ProductModel }]
        });

        return {
            status: true,
            message: "Sales data as per request.",
            data: salesData
        }
    } catch (error) {
        console.error("Error in fetching sales report.", error.message);
        return {
            status: false,
            message: "An error occurred during fetching sales report. Please try again later."
        };
    }
}


module.exports = GetSalesService;