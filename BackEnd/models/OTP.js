
const mongoose = require("mongoose");
const mailSender = require("../config/mailSender");
const emailTemplate = require("../mailTemplates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 15*60,
    },
    OTP: {
        type: String,
        required: true,
    }
});

// a function -> to send email
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", emailTemplate(otp));
        console.log("Email Sent Successfully", mailResponse);
    }
    catch(error){
        console.log("Error Occured while sending Otp Email", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.OTP);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);
