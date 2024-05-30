const UsersModel = require("../../models/user.model");
const bcrypt = require('bcrypt');
const JsonTokenGenerator = require("./JsonTokenGenerator.service");

async function UserLoginService(username, password) {
    try {

        // Input validation
        if (!username || !password) {
            return {
                status: false,
                message: "Username and password are required."
            };

        }

        const isUser = await UsersModel.findOne({ where: { username: username } });

        if (!isUser) {
            return {
                status: false,
                message: "User does not exist!"
            };
        }

        const passwordMatch = await bcrypt.compare(password, isUser.password);

        if (passwordMatch) {
            const token = JsonTokenGenerator(isUser.id, isUser.role);
            return {
                status: true,
                message: "Login successful",
                token: token,
                data: isUser
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

module.exports = UserLoginService;
