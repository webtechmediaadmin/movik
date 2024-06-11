const ManagerModel = require("../../models/manager.model");

async function DeleteManagerService(id) {
    try {
        const deleteManagerDetails = await ManagerModel.findOne({ where: { id: id } });

        if (!deleteManagerDetails) {
            return {
                status: true,
                message: "Manager not found"
            }
        }

        deleteManagerDetails.deactivatedBySuperAdmin = !deleteManagerDetails.deactivatedBySuperAdmin;
        await deleteManagerDetails.save();

        return {
            status: true,
            message: "Manager deleted successfully"
        }
    } catch (error) {
        console.error("Error in editing Managers", error.message);
        return {
            status: false,
            message: "An error occurred during editing Managers. Please try again later."
        };
    }
}


module.exports = DeleteManagerService;