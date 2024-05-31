const DealerModel = require("../../models/dealer.model");

async function MyProfileService(id) {
    try {
        const dealer = await DealerModel.findOne({ where: { id: id } });

        if (!dealer) {
            return {
                status: false,
                message: "Dealer not found!"
            };
        }

        // If user is found, return dealer data
        return {
            status: true,
            data: dealer,
            message: "Dealer found successfully"
        };

    } catch (error) {
        // Handle database operation error
        console.error("Error in MyProfileService:", error);
        return {
            status: false,
            message: "An error occurred while fetching dealer data"
        };
    }
}

module.exports = MyProfileService;
