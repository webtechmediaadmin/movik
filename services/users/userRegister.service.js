const bcrypt = require('bcrypt');
const UsersModel = require('../../models/user.model');

async function UserRegisterService(name, username, password, role) {
    try {
        // Check if user with the provided email already exists
        const existingUser = await UsersModel.findOne({ where: { username: username } });

        if (existingUser) {
            return {
                status: false,
                message: "User is already registered!"
            };
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 6);

        // Create a new user
        const newUser = await UsersModel.create({ name: name, username: username, password: hashPassword, role });

        // Return success response
        return {
            status: true,
            message: "User registration successful!",
            data: newUser // Optional: Return the newly created user
        };
    } catch (error) {
        console.error("Error in user registration:", error.message);
        return {
            status: false,
            message: "An error occurred during user registration. Please try again later."
        };
    }
}

module.exports = UserRegisterService;
