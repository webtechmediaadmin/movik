const CreateProductsService = require("../services/products/CreateProducts.service");
const GetProductsService = require("../services/products/GetProducts.service");
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/products');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});


async function GetProductController(req, res) {
    try {
        const { id, slug } = req.query;
        const fetchProduct = await GetProductsService(id, slug);

        return res.status(fetchProduct.status ? 200 : 404).json({
            status: fetchProduct.status,
            count: fetchProduct.count,
            data: fetchProduct.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function CreateProductController(req, res) {
    try {
        let { name, slug, inventoryCount } = req.body;

        let image = '';

        if (req.file) {
            image = 'uploads/products/' + req.file.filename;
        }
        const createProduct = await CreateProductsService(name, slug, inventoryCount, image);

        return res.status(createProduct.status ? 200 : 404).json({
            status: createProduct.status,
            message: createProduct.message,
            data: createProduct.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditProductController(req, res) {
    try {

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteProductController(req, res) {
    try {

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { GetProductController, CreateProductController, EditProductController, DeleteProductController };