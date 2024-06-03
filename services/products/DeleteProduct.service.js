const ProductModel = require("../../models/product.model");

async function DeleteProductsService(id) {
    try {
        const fetchProduct = await ProductModel.findOne({ where: { id: id } });

        if (!fetchProduct) {
            return {
                status: false,
                message: "Product not found"
            }
        }

        // Delete the product
        await ProductModel.destroy({ where: { id: id } });

        // Return successful response
        return {
            status: true,
            message: "Product deleted successfully."
        };
    } catch (error) {
        console.error("Error in deleting products", error.message);
        return {
            status: false,
            message: "An error occurred during deleting products. Please try again later."
        };
    }
}


module.exports = DeleteProductsService;