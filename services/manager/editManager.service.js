const ManagerModel = require("../../models/manager.model");
const bcrypt = require('bcrypt');

async function EditManagerService(id, name, email, address, password, managerPhoneNumber) {
    try {
        const managerData = await ManagerModel.findOne({ where: { id: id } });

        if (!managerData) {
            return {
                status: false,
                message: "Manager data not found!"
            };
        }

        if (name) {
            managerData.name = name;
        }

        if (email) {
            managerData.email = email;
        }

        if (address) {
            managerData.address = address;
        }

        // Hash the new password if provided
        if (password) {
            const hashPassword = await bcrypt.hash(password, 6); // Increasing the cost factor to 10 for better security
            managerData.password = hashPassword;
        }

        if (managerPhoneNumber) {
            if (managerPhoneNumber.length === 10) {
                managerData.managerPhoneNumber = managerPhoneNumber;
            } else {
                return {
                    status: false,
                    message: 'Phone Number is not valid!'
                };
            }
        }

        await managerData.save();

        return {
            status: true,
            message: "Manager data updated successfully"
        };
    } catch (error) {
        console.error("Error in editing manager:", error.message);
        return {
            status: false,
            message: "An error occurred while editing manager. Please try again later."
        };
    }
}

module.exports = EditManagerService;
