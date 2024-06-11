const CreateProductsService = require("../services/products/CreateProducts.service");
const DeleteProductsService = require("../services/products/DeleteProduct.service");
const EditProductsService = require("../services/products/EditProduct.service");
const GetProductsService = require("../services/products/GetProducts.service");
const multer = require('multer');
const StatusChangeService = require("../services/products/StatusChanger.service");

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
        const { id, slug, status } = req.query;
        const fetchProduct = await GetProductsService(id, slug, status);

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
        const { name, slug, inventoryCount } = req.body;

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
        let id = req.params.id;

        let { name, slug, inventoryCount } = req.body;
        if (req.file) {
            image = 'uploads/products/' + req.file.filename;
        }

        const editProduct = await EditProductsService(id, name, slug, inventoryCount, image);

        return res.status(editProduct.status ? 200 : 404).json({
            status: editProduct.status,
            message: editProduct.message,
            data: editProduct.data
        })
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
        const id = req.params.id;

        const deleteProduct = await DeleteProductsService(id);

        return res.status(deleteProduct.status ? 200 : 404).json({
            status: deleteProduct.status,
            message: deleteProduct.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function StatusChangeController(req, res) {
    try {
        const id = req.params.id;

        const statusChanger = await StatusChangeService(id);

        return res.status(statusChanger.status ? 200 : 404).json({
            status: statusChanger.status,
            message: statusChanger.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { GetProductController, CreateProductController, EditProductController, DeleteProductController, StatusChangeController, upload };