const SuperAdminModel = require("../../models/superAdmin.model");
const bcrypt = require('bcrypt');

async function RegisterSuperAdmin(email, password) {
    try {
        // Check if the super admin with the given email already exists
        const isSuperAdmin = await SuperAdminModel.findOne({ where: { email: email } });

        if (isSuperAdmin) {
            // If the super admin already exists, return a failure status
            return {
                status: false,
                message: "Email is already registered."
            };
        }

        // Hash the provided password
        const hashPassword = await bcrypt.hash(password, 6);

        // Create a new super admin entry in the database
        const superAdmin = await SuperAdminModel.create({ email: email, password: hashPassword });

        // Return a success status
        return {
            status: true,
            message: "Super admin registered successfully.",
            data: superAdmin
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

module.exports = RegisterSuperAdmin;
