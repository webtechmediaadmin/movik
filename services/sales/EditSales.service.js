const SalesModel = require("../../models/sales.model");

async function EditSalesService(id, productID, quantity, totalPrice, buyerName, buyerPhoneNumber, buyerAddress) {
    try {
        const fetchSalesItem = await SalesModel.findOne({ where: { id: id } });

        if (!fetchSalesItem) {
            return {
                status: false,
                message: 'Sales item not found'
            }
        }

        if (productID){
            fetchSalesItem.productID = productID;
        }

        fetchSalesItem.quantity = quantity;
        fetchSalesItem.totalPrice = totalPrice;
        fetchSalesItem.buyerName = buyerName;
        fetchSalesItem.buyerPhoneNumber = buyerPhoneNumber;
        fetchSalesItem.buyerAddress = buyerAddress;

        await fetchSalesItem.save();

        return {
            status: true,
            message: 'Sales item updated successfully',
            data: fetchSalesItem
        }
    } catch (error) {
        console.error("Error in editing sales report.", error.message);
        return {
            status: false,
            message: "An error occurred during editing sales report. Please try again later."
        };
    }
}

module.exports = EditSalesService;