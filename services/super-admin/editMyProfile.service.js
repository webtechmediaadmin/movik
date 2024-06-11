const bcrypt = require('bcrypt');
const AdminModel = require('../../models/admin.model');

async function EditMyProfile(id, name, password, image) {
    try {
        // Find the admin by ID
        let fetchProfile = await AdminModel.findOne({ where: { id: id } });

        // Handle if the admin is not found
        if (!fetchProfile) {
            return {
                status: false,
                message: "Admin not found"
            };
        }

        // Hash the new password if provided
        if (password) {
            const hashPassword = await bcrypt.hash(password, 6); // Increasing the cost factor to 10 for better security
            fetchProfile.password = hashPassword;
        }

        // Update the admin's name and image
        fetchProfile.name = name;
        fetchProfile.image = image;

        // Save the changes to the database
        await fetchProfile.save();

        // Return successful response
        return {
            status: true,
            message: "Profile updated successfully.",
            data: fetchProfile
        };
    } catch (error) {
        console.error("Error in editing profile", error.message);
        return {
            status: false,
            message: "An error occurred during editing profile. Please try again later."
        };
    }
}

module.exports = EditMyProfile;
