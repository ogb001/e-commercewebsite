const express = require("express");

const router = express.Router(); // Initialize express router

// Import controllers
const userSignUpController = require("../controller/userSignUp");
const userSigninController = require("../controller/userSignin");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");

// Define the routes and pass the controller functions
router.post("/signup", userSignUpController);
router.post("/signin", userSigninController);
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)



module.exports = router; // Export the router
