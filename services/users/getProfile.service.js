const UsersModel = require("../../models/user.model");

async function MyProfileService(id) {
    try {
        const user = await UsersModel.findOne({ where: { id: id } });

        if (!user) {
            return {
                status: false,
                message: "user not found!"
            };
        }

        // If user is found, return user data
        return {
            status: true,
            data: user,
            message: "user found successfully"
        };

    } catch (error) {
        // Handle database operation error
        console.error("Error in MyProfileService:", error);
        return {
            status: false,
            message: "An error occurred while fetching user data"
        };
    }
}

module.exports = MyProfileService;
