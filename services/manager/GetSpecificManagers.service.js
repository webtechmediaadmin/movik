const AdminModel = require("../../models/admin.model");
const ManagerModel = require("../../models/manager.model");

async function GetSpecificMangersService(adminID) {
    try {

        const managerList = await ManagerModel.findAll({
            where: adminID,
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


module.exports = GetSpecificMangersService;