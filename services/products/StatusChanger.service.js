const ProductModel = require("../../models/product.model");

async function StatusChangeService(id){
    try {
        const fetchProducts = await ProductModel.findOne({ where: { id: id } });

        if (!fetchProducts) {
            return {
                status: false,
                message: 'Products not found!'
            };
        }

        fetchProducts.status = !fetchProducts.status;

        await fetchProducts.save();

        return {
            status: true,
            message: "Status updated successfully."
        };
    } catch (error) {
        console.log(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = StatusChangeService;