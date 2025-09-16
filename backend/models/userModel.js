const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String, // Corrected the type to be String, with lowercase 's'
        default: ""  // Optional: Set a default value if needed
    }
}, {
    timestamps: true  // This adds `createdAt` and `updatedAt` fields automatically
});

const User = mongoose.model('User', userSchema);

module.exports = User;


