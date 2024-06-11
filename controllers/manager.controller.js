const DeleteManagerService = require("../services/manager/DeleteManager.service");
const GetManagersService = require("../services/manager/GetManagers.service");
const GetSpecificMangersService = require("../services/manager/GetSpecificManagers.service");
const LoginManagerService = require("../services/manager/loginManager.service");
const GetMyProfileService = require("../services/manager/myProfile.service");

async function LoginManagerController(req, res) {
    try {
        const { email, password } = req.body;

        const loginSuccess = await LoginManagerService(email, password);

        return res.status(loginSuccess.status ? 200 : 404).json({
            status: loginSuccess.status,
            message: loginSuccess.message,
            token: loginSuccess.status ? loginSuccess.token : null,
            data: loginSuccess.status ? loginSuccess.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetMyProfileController(req, res) {
    try {
        const userID = req.userID;

        const fetchProfile = await GetMyProfileService(userID);

        return res.status(fetchProfile.status ? 200 : 404).json({
            status: fetchProfile.status,
            message: fetchProfile.message,
            data: fetchProfile.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetManagerController(req, res) {
    try {
        const { id, adminID, deactivatedBySuperAdmin } = req.query;

        const fetchManagers = await GetManagersService(id, adminID, deactivatedBySuperAdmin);

        return res.status(fetchManagers.status ? 200 : 404).json({
            status: fetchManagers.status,
            message: fetchManagers.message,
            data: fetchManagers.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function GetSpecificManagerController(req, res) {
    try {
        const adminID = req.userID;

        const fetchManagers = await GetSpecificMangersService(adminID);

        return res.status(fetchManagers.status ? 200 : 404).json({
            status: fetchManagers.status,
            message: fetchManagers.message,
            data: fetchManagers.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function DeleteManagerController(req, res) {
    try {
        const id = req.params.id;

        const deleteManager = await DeleteManagerService(id);

        return res.status(deleteManager.status ? 200 : 404).json({
            status: deleteManager.status,
            message: deleteManager.message,
            data: deleteManager.data
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { LoginManagerController, GetMyProfileController, GetManagerController, GetSpecificManagerController, DeleteManagerController };