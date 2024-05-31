const bcrypt = require('bcrypt');
const DealerModel = require('../../models/dealer.model');

async function RegisterDealerService(name, username, password, role, adminID) {
    try {
        // Check if user with the provided email already exists
        const existingUser = await DealerModel.findOne({ where: { username: username } });

        if (existingUser) {
            return {
                status: false,
                message: "User is already registered!"
            };
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 6);

        // Create a new user
        const newUser = await DealerModel.create({ name: name, username: username, password: hashPassword, role, adminID });

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

module.exports = RegisterDealerService;
