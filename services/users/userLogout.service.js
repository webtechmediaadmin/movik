async function UserLogoutService() {
    try {
        // Any additional logout logic can be added here
        return { status: true, message: 'Logout successful' };
    } catch (error) {
        console.error(error);
        return { status: false, message: 'Logout failed' };
    }
}

module.exports = UserLogoutService;
