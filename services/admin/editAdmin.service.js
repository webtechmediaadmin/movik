const AdminModel = require("../../models/admin.model");
const bcrypt = require('bcrypt');

async function EditAdminService(id, name, email, password) {
    try {
        const adminData = await AdminModel.findOne({ where: { id: id } });

        if (!adminData) {
            return {
                status: false,
                message: "Admin data not found!"
            }
        }

        if (name) {
            adminData.name = name;
        }

        if (email) {
            adminData.email = email;
        }

        // Hash the new password if provided
        if (password) {
            const hashPassword = await bcrypt.hash(password, 6); // Increasing the cost factor to 10 for better security
            managerData.password = hashPassword;
        }

        await adminData.save();

        return {
            status: true,
            message: "Admin data updated successfully"
        }
    } catch (error) {
        console.error("Error in editing admin:", error.message);
        return {
            status: false,
            message: "An error occurred while editing admin. Please try again later."
        };
    }
}


module.exports = EditAdminService;