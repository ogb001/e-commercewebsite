const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel"); // Make sure this path is correct
const jwt = require('jsonwebtoken');

async function userSigninController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                error: true,
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            // Generate JWT token
            const tokenData = {
                id: user._id, // Add user-specific data if needed
                email: user.email
            };

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }

            // Send a response only once
            return res.cookie("token", token, tokenOption).status(401).json({
                message: "Please check password",
                error: true,
                success: false,
                token // Include the generated token in response
            });
        }

        // If everything is correct, send a success response
        return res.status(200).json({
            message: "Sign in successful",
            error: false,
            success: true,
            user: { id: user._id, email: user.email }
        });

    } catch (err) {
        console.log("Error:", err.message);
        return res.status(500).json({
            message: err.message || "An error occurred during sign in",
            error: true,
            success: false
        });
    }
}

module.exports = userSigninController;
