const AdminModel = require("../../models/admin.model");

async function EditAdminService(id, name, email) {
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