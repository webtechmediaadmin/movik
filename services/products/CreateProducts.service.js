const ProductModel = require("../../models/product.model");

async function CreateProductsService(name, slug, inventoryCount, image) {
    try {
        const newProduct = await ProductModel.create(name, slug, inventoryCount, image);

        // Return successful response
        return {
            status: true,
            message: "Product created successfully.",
            data: newProduct
        };
    } catch (error) {
        console.error("Error in creating products", error.message);
        return {
            status: false,
            message: "An error occurred during creating products. Please try again later."
        };
    }
}


module.exports = CreateProductsService;