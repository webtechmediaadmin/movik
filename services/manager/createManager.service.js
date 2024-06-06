const bcrypt = require('bcrypt');
const ManagerModel = require("../../models/manager.model");

async function CreateManagerService(name, email, password, address, role, adminID) {
    try {
        // Check if the super admin with the given email already exists
        const isManager = await ManagerModel.findOne({ where: { email: email } });

        if (isManager) {
            // If the super admin already exists, return a failure status
            return {
                status: false,
                message: "Email is already registered."
            };
        }

        // Hash the provided password
        const hashPassword = await bcrypt.hash(password, 6);

        // Create a new super admin entry in the database
        const manager = await ManagerModel.create({ name, email: email, password: hashPassword, address, role, adminID });

        // Return a success status
        return {
            status: true,
            message: "Manager registered successfully.",
            data: manager
        };

    } catch (error) {
        // Log the error and return a failure status
        console.error("Error in user registration:", error.message);
        return {
            status: false,
            message: "An error occurred during user registration. Please try again later."
        };
    }
}

module.exports = CreateManagerService;
