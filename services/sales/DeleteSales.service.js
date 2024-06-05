const SalesModel = require("../../models/sales.model");

async function DeleteSalesService(id) {
    try {
        const fetchSalesItem = await SalesModel.findOne({ where: { id: id } });

        if (!fetchSalesItem) {
            return {
                status: false,
                message: 'Sales item not found'
            }
        }

        await fetchSalesItem.destroy();

        return {
            status: true,
            message: 'Sales item deleted successfully',
            data: fetchSalesItem
        }
    } catch (error) {
        console.error("Error in deleting sales report.", error.message);
        return {
            status: false,
            message: "An error occurred during deleting sales report. Please try again later."
        };
    }
}

module.exports = DeleteSalesService;