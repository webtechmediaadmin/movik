const ProductModel = require("../../models/product.model");

async function GetProductsService(id, slug, status) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (slug) {
            whereClause.slug = slug;
        }

        if (status) {
            whereClause.status = status;
        }

        const productList = await ProductModel.findAll({
            where: whereClause
        });

        return {
            status: true,
            count: productList.length,
            data: productList
        };
    } catch (error) {
        console.error("Error in fetching products details:", error.message);
        return {
            status: false,
            message: "An error occurred during fetching products details. Please try again later."
        };
    }
}


module.exports = GetProductsService;