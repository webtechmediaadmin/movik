const AdminModel = require("../../models/admin.model");
const bcrypt = require('bcrypt');

async function CreateAdmin(name, email, password) {
    try {
        // Check if the super admin with the given email already exists
        const isAdmin = await AdminModel.findOne({ where: { email: email } });

        if (isAdmin) {
            // If the super admin already exists, return a failure status
            return {
                status: false,
                message: "Email is already registered."
            };
        }

        // Hash the provided password
        const hashPassword = await bcrypt.hash(password, 6);

        // Create a new super admin entry in the database
        const admin = await AdminModel.create({ name, email: email, password: hashPassword });

        // Return a success status
        return {
            status: true,
            message: "Admin registered successfully.",
            data: admin
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

module.exports = CreateAdmin;
