async function userLogout(req, res) {
    try {
        // Corrected to use dot notation for the response object
        res.clearCookie('token');

        res.json({
            message: "Logged out successfully",
            data: [],
            error: false,
            success: true
        });
        
    } catch (err) {
        res.status(500).json({
            message: err.message || "An error occurred during logout",
            error: true,
            success: false
        });
    }
}

module.exports = userLogout;
