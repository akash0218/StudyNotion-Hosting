
const User = require("../models/User");
const mailSender = require("../config/mailSender");
const {passwordReset} = require("../mailTemplates/passwordReset");
const bcrypt = require("bcrypt");
const {passwordUpdated} = require("../mailTemplates/passwordUpdate");
const crypto = require("crypto");



// resetPassword Token
exports.resetPasswordToken = async (req, res) => {

    try{
        // get email from body
        const {email} = req.body;
        // check user from email, email validation
        const user = await User.findOne({emailID: email});
        if(!user){
            return res.json({
                success: false,
                message: 'Your Email is not registered with us',
            })
        }
        // token generation
        const token = crypto.randomUUID()
        // update user by adding token and expiration time
        const data = await User.findOneAndUpdate({emailID: email}, {token: token, resetPasswordExpires: Date.now() + 5*60*1000}, {new: true});
        //create url
        const url = `http://localhost:3000/reset-password/${token}`
        // send email
        try{
            await mailSender(email, "Password Reset Link", passwordReset(url, user.firstName));
        }
        catch(error){
            console.log(error)
        }
        //return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Link sent to email successfully",
            data: data,
        })   
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending the password reset link",
        })
    }

}


// resetPassword
exports.resetPassword = async (req, res) => {

    try{
        // data fetch
        // token will be sent to body by front end
        const {password, confirmPassword, token} = req.body;
        // validation
        if(password !== confirmPassword){
            return  res.status(401).json({
                success: false,
                message: "Passwords donot match!!",
            })
        }
        // get userdetails from db using token that was generated above
        const user = await User.findOne({token: token});
        // if no entry - invalid token
        if(!user){
            return res.json({
                success: false,
                message: 'Token is Invalid',
            })
        }
        // token valid time check
        if(user.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: 'Token is expired, please regenerate your token'
            })
        }
        // hash password
        let securePassword;
        try{
            securePassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(400).json({
                success: false,
                message: "Error in hashing the password",
            })
        }
        // update password
        await User.findOneAndUpdate({emailID: user.emailID}, {password: securePassword}, {new: true});
        // send email
        await mailSender(user.emailID, "Password Reset Successful", passwordUpdated(user.emailID, user.firstName));
        // return response
        return res.status(200).json({
            success: true,
            message: "Password reset Successful",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password",
        })
    }

}

// changePassword