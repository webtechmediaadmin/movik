const LoginAdmin = require("../services/admin/loginAdmin.service");
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


async function CreateManagerController(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const adminID = req.userID;

        const registerSuccess = await CreateManagerService(name, email, password, role, adminID);

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



module.exports = { LoginAdminController, CreateManagerController };