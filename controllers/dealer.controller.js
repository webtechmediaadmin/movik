const DealerLoginService = require("../services/dealers/LoginDealer.service");
const RegisterDealerService = require("../services/dealers/RegisterDealer.service");
const UserLogoutService = require("../services/users/userLogout.service");

async function DealerRegisterController(req, res) {
    try {
        const { name, username, password, role } = req.body;
        const adminID = req.userID;
        const DealerRegister = await RegisterDealerService(name, username, password, role, adminID);

        return res.status(DealerRegister.status ? 200 : 400).json({
            status: DealerRegister.status,
            message: DealerRegister.message,
            data: DealerRegister.data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function DealerLoginController(req, res) {
    try {
        const { username, password } = req.body;
        const emailLogin = await DealerLoginService(username, password);

        if (emailLogin.status) {
            // Set the token in a cookie
            res.cookie('token', emailLogin.token, {
                httpOnly: true, // The cookie is not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                sameSite: 'Strict' // Protects against CSRF attacks
            });

            return res.status(200).json({
                status: true,
                message: emailLogin.message,
                data: emailLogin.data
            });
        } else {
            return res.status(404).json({
                status: false,
                message: emailLogin.message,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

async function DealerLogoutController(req, res) {
    try {
        const result = await UserLogoutService();

        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });

        return res.status(result.status ? 200 : 500).json({
            status: result.status,
            message: result.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}

module.exports = { DealerRegisterController, DealerLoginController, DealerLogoutController };
