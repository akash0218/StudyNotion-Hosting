
const express = require("express");
const router = express.Router();

const {auth, isStudent} = require("../middlewares/Auth"); 
const { verifyPayment, capturePayment, sendPaymentSuccessEmail } = require("../controllers/Payments");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail)

module.exports = router;