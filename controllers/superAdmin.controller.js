const GetAdminService = require("../services/admin/GetAdmin.service");
const CreateAdmin = require("../services/admin/createAdmin.service");
const LoginSuperAdmin = require("../services/super-admin/loginSuperAdmin.service");
const GetMyProfileService = require("../services/super-admin/myProfile.service");
const RegisterSuperAdmin = require("../services/super-admin/registerSuperAdmin.service");

async function RegisterSuperAdminController(req, res) {
    try {
        const { email, password } = req.body;

        const registerSuccess = await RegisterSuperAdmin(email, password);

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

async function LoginSuperAdminController(req, res) {
    try {
        const { email, password } = req.body;

        const loginSuccess = await LoginSuperAdmin(email, password);

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


async function CreateAdminController(req, res) {
    try {
        const { name, email, password } = req.body;

        const registerSuccess = await CreateAdmin(name, email, password);

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

async function FetchAdminController(req, res) {
    try {
        const { id } = req.query;

        const fetchAdmins = await GetAdminService(id);

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


module.exports = { RegisterSuperAdminController, LoginSuperAdminController, GetMyProfileController, CreateAdminController, FetchAdminController };