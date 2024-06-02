const bcrypt = require('bcrypt');
const JsonTokenGenerator = require('../../utils/JsonTokenGenerator.utils');
const ManagerModel = require('../../models/manager.model');


async function LoginManagerService(email, password) {
    try {

        // Input validation
        if (!email || !password) {
            return {
                status: false,
                message: "Email and password are required."
            };

        }

        const isManager = await ManagerModel.findOne({ where: { email: email } });

        if (!isManager) {
            return {
                status: false,
                message: "User does not exist!"
            };
        }

        const passwordMatch = await bcrypt.compare(password, isManager.password);

        if (passwordMatch) {
            const token = JsonTokenGenerator(isManager.id, isManager.role);
            return {
                status: true,
                message: "Login successful",
                token: token,
                data: isManager
            };
        } else {
            return {
                status: false,
                message: "Wrong Credentials",
            };
        }
    } catch (error) {
        console.error("Error in user logging in:", error.message);
        return {
            status: false,
            message: "An error occurred during user logging in. Please try again later."
        }
    }
}

module.exports = LoginManagerService;
