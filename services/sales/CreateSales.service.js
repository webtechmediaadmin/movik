const SalesModel = require("../../models/sales.model");

async function CreateSalesService(managerID, productID, quantity, totalPrice, date, buyerName, buyerPhoneNumber, buyerAddress) {
    try {
        const newSale = await SalesModel.create({ managerID, productID, quantity, totalPrice, date, buyerName, buyerPhoneNumber, buyerAddress });

        return {
            status: true,
            message: "Sales Report created successfully.",
            data: newSale
        }
    } catch (error) {
        console.error("Error in creating sales report.", error.message);
        return {
            status: false,
            message: "An error occurred during creating sales report. Please try again later."
        };
    }
}


module.exports = CreateSalesService;