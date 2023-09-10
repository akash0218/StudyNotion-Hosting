
const express = require("express");
const router = express.Router();

// importing controllers
const {sendOTP, signUp, signIn, changePassword} = require("../controllers/Auth");

// importing middlewares
const {auth} = require("../middlewares/Auth");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");

// sendOTP, signUp, signIn, changePassword
router.post("/sendotp", sendOTP);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/changePassword", auth, changePassword);

// Reset Password token
router.post("/reset-password-token", resetPasswordToken);
// Reset password after verification
router.post("/reset-password", resetPassword);

module.exports = router;