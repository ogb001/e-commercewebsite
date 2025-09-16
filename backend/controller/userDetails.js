async function userDetailsController(req, res) {
    try {
        // Determine the user ID from URL params or JWT token
        const userId = req.params.id || req.user?.id;

        // Check if user ID is available
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false
            });
        }

        // Fetch user details from the database.
        const user = await userModel.findById(userId);

        // If the user is not found in the database
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        // Send success response with user details
        res.status(200).json({
            message: "User details retrieved successfully",
            data: user,
            error: false,
            success: true
        });

    } catch (err) {
        // Handle any errors that occur
        console.error("Error:", err.message);
        res.status(500).json({
            message: err.message || "An error occurred while retrieving user details",
            error: true,
            success: false
        });
    }
}

module.exports = userDetailsController;