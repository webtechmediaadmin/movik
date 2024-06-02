const AdminModel = require("../../models/admin.model");
const ManagerModel = require("../../models/manager.model");

async function GetManagersService(id, adminID) {
    try {
        let whereClause = {};

        if (id) {
            whereClause.id = id;
        }

        if (adminID) {
            whereClause.adminID = adminID;
        }

        const managerList = await ManagerModel.findAll({
            where: whereClause,
            include: [
                { model: AdminModel }
            ]
        });

        return {
            status: true,
            count: managerList.length,
            data: managerList
        };
    } catch (error) {
        console.error("Error in fetching managers:", error.message);
        return {
            status: false,
            message: "An error occurred while fetching managers. Please try again later."
        };
    }
}


module.exports = GetManagersService;