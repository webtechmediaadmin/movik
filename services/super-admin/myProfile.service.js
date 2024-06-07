const AdminModel = require("../../models/admin.model");

async function GetMyProfileService(userID) {
    try {
        const user = await AdminModel.findOne({ where: { id: userID } });

        if (!user) {
            return {
                status: false,
                message: "User not found.",
                data: null
            };
        }

        return {
            status: true,
            message: "Super-Admin data as required.",
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
