const CreateSalesService = require("../services/sales/CreateSales.service");
const DeleteSalesService = require("../services/sales/DeleteSales.service");
const EditSalesService = require("../services/sales/EditSales.service");
const GetSalesService = require("../services/sales/GetSales.service");
const GetSpecificSalesService = require("../services/sales/GetSpecificSales.service");

async function CreateSalesController(req, res) {
    try {
        const { productID, quantity, totalPrice, date } = req.body;
        const managerID = req.userID;

        const salesCreation = await CreateSalesService(managerID, productID, quantity, totalPrice, date);

        return res.status(salesCreation.status ? 200 : 404).json({
            status: salesCreation.status,
            message: salesCreation.message,
            data: salesCreation.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetSalesController(req, res) {
    try {
        const { id, managerID } = req.query;

        const fetchSales = await GetSalesService(id, managerID);

        return res.status(fetchSales.status ? 200 : 404).json({
            status: fetchSales.status,
            message: fetchSales.message,
            data: fetchSales.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetSalesAsAdminController(req, res) {
    try {
        const adminID  = req.userID;

        const fetchSales = await GetSpecificSalesService(adminID);

        return res.status(fetchSales.status ? 200 : 404).json({
            status: fetchSales.status,
            message: fetchSales.message,
            data: fetchSales.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function EditSalesController(req, res) {
    try {
        const id = req.params.id;
        const { productID, quantity, totalPrice, date } = req.body;

        const editSales = await EditSalesService(id, productID, quantity, totalPrice, date);

        return res.status(editSales.status ? 200 : 404).json({
            status: editSales.status,
            message: editSales.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


async function DeleteSalesController(req, res) {
    try {
        const id = req.params.id;

        const deleteSales = await DeleteSalesService(id);

        return res.status(deleteSales.status ? 200 : 404).json({
            status: deleteSales.status,
            message: deleteSales.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { CreateSalesController, GetSalesController, GetSalesAsAdminController, EditSalesController, DeleteSalesController };