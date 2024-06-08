const AdminModel = require("../../models/admin.model");

async function GetAdminService(id) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }


        const adminList = await AdminModel.findAll({
            where: whereClause
        });

        return {
            status: true,
            count: adminList.length,
            data: adminList
        };
    } catch (error) {
        console.error("Error in fetching admin:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching admin. Please try again later."
        };
    }
}


module.exports = GetAdminService;