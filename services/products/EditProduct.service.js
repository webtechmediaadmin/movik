const ProductModel = require("../../models/product.model");

async function EditProductsService(id, name, slug, inventoryCount, image, status) {
    try {
        let fetchProduct = await ProductModel.findOne({ where: { id: id } });

        if (!fetchProduct) {
            return {
                status: false,
                message: "Product not found"
            }
        }

        fetchProduct.name = name;
        fetchProduct.slug = slug;
        fetchProduct.inventoryCount = inventoryCount;
        fetchProduct.image = image;
        fetchProduct.status = status;

        await fetchProduct.save();

        // Return successful response
        return {
            status: true,
            message: "Product updated successfully.",
            data: fetchProduct
        };
    } catch (error) {
        console.error("Error in editing products", error.message);
        return {
            status: false,
            message: "An error occurred during editing products. Please try again later."
        };
    }
}


module.exports = EditProductsService;