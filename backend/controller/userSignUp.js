const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        const user = await userModel.findOne({email})

        console.log("user", user)

        if(user){
            return res.status(409).json({
                success: false,
                error: true,
                message: "User already exists"
            });
        }

        // Input validation
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Please provide email, password, and name"
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Invalid email format"
            });
        }

        // Password strength check (example: at least 8 characters)
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Password must be at least 8 characters long"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const payload = {
            email,
            role : "GENERAL",
            password: hashedPassword,
            name
        };

        const userData = new userModel(payload);
        const savedUser = await userData.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        console.log("err", err.message)
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;