const ManagerModel = require("../../models/manager.model");
const AdminModel = require("../../models/admin.model");

async function GetMyProfileService(userID) {
    try {
        const user = await ManagerModel.findOne({ where: { id: userID }, include: { model: AdminModel } });

        if (!user) {
            return {
                status: false,
                message: "User not found.",
                data: null
            };
        }

        return {
            status: true,
            message: "Manager data as required.",
            data: user
        };
    } catch (error) {
        console.error("Error in fetching profile details:", error.message);
        return {
            status: false,
            message: "An error occurred during fetching profile details. Please try again later."
        };
    }
}

module.exports = GetMyProfileService;
