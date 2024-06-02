const LoginManagerService = require("../services/manager/loginManager.service");

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


module.exports = { LoginManagerController };