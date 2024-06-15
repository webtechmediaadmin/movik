const EditAdminService = require("../services/admin/editAdmin.service");
const LoginAdmin = require("../services/admin/loginAdmin.service");
const GetMyProfileService = require("../services/admin/myProfile.service");
const CreateManagerService = require("../services/manager/createManager.service");

async function LoginAdminController(req, res) {
    try {
        const { email, password } = req.body;

        const loginSuccess = await LoginAdmin(email, password);

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


async function CreateManagerController(req, res) {
    try {
        const { name, email, password, role, address } = req.body;
        const adminID = req.userID;

        const registerSuccess = await CreateManagerService(name, email, password, address, role, adminID);

        return res.status(registerSuccess.status ? 200 : 404).json({
            status: registerSuccess.status,
            message: registerSuccess.message,
            data: registerSuccess.status ? registerSuccess.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function UpdateAdminDetailsController(req, res) {
    try {
        const id = req.userID;
        const { name, email, password } = req.body;


        const fetchAdmins = await EditAdminService(id, name, email, password);

        return res.status(fetchAdmins.status ? 200 : 404).json({
            status: fetchAdmins.status,
            message: fetchAdmins.message,
            data: fetchAdmins.status ? fetchAdmins.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}


module.exports = { LoginAdminController, GetMyProfileController, CreateManagerController, UpdateAdminDetailsController };