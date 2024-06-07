const ManagerModel = require("../../models/manager.model");
const ProductModel = require("../../models/product.model");
const SalesModel = require("../../models/sales.model");

async function GetSpecificSalesService(adminID) {
    try {
        const salesData = await SalesModel.findAll({
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


module.exports = GetSpecificSalesService;