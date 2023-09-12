
// controllers
const otpGenerator = require("otp-generator");
const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../config/mailSender");
const Profile = require("../models/Profile");
const InstructorApprovalsSchema = require("../models/InstructorApprovals")
const {passwordUpdated} = require("../mailTemplates/passwordUpdate")
require("dotenv").config();

// sendOTP
exports.sendOTP = async (req, res) => {

    try{
        // fetch data from request.body
        const {email} = req.body;

        // check whether email exists in the db
        const user = await User.findOne({emailID: email});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User already exits, please sign-in..!!",
            })
        }

        // generate otp
        let otp;
        try{
            otp = await otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            // check unique otp or not
            let result = await OTP.findOne({OTP: otp});
            // check whether our otp is unique or not
            while(result){
                otp = await otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                result = await OTP.findOne({OTP: otp});
            }

            // save otp in db
            const data = await OTP.create({
                email, 
                OTP: otp
            })
            res.status(201).json({
                success: true,
                message: "OTP Generated successfully",
                data: data,
            })
        }
        catch(error){
            console.log(error);
            return res.status(400).json({
                success: false,
                message: "Error in generating OTP",
            })
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// signUp
exports.signUp = async (req, res) => {
    console.log("akash", "insignup")
    try{
        // data fetch from request body
        const {firstName, lastName, emailId, password, confirmPassword, accountType, otp} = req.body;
        // data validation
        if(!firstName || !lastName || !emailId || !password || !confirmPassword || !otp){
            return res.status(500).json({
                success: false,
                message: "Please Enter all the required information",
            })
        }
        // password validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Passwords donot match!!",
            })
        }
        // check user exits or not
        const user = await User.findOne({emailID: emailId});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User already exists, Please signIn",
            })
        }
        // find most recent otp of the user
        const recentOTP = await OTP.findOne({email:emailId}).sort({createdAt: -1}).limit(1);
        
        // validation of recentOTP
        if(!recentOTP){
            return res.status(403).json({
                success: false,
                message: "OTP has expired, please create otp again",
            })
        }
        
        // validate otp
        if(recentOTP.length == 0){
            return res.status(400).json({
                success: false,
                message: "Otp not Found",
            })
        }
        else if(otp != recentOTP.OTP){
            return res.status(401).json({
                success: false,
                message: "OTP doesn't match, please enter the most recent OTP",
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
        // creating profile object
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
        })

        if(accountType == "Instructor"){
            const data = await InstructorApprovalsSchema.create({
                firstName,
                lastName,
                emailID: emailId,
                password: securePassword,
                accountType,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            })
            return res.status(201).json({
                success: true,
                message: "Instructor Created Successfully, awaiting approval!!",
                data: data,
            })
        }
        else{
            //create entry in db
            const data = await User.create({
                firstName,
                lastName,
                emailID: emailId,
                password: securePassword,
                accountType,
                additionalDetails: profileDetails._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
            })
            return res.status(201).json({
                success: true,
                message: "User Created Successfully",
                data: data,
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// signIn
exports.signIn = async (req, res) => {

    try{
        // fetch data from body
        const {emailId, password} = req.body;
        // validate data
        if(!emailId || !password){
            return res.status(500).json({
                success: false,
                message: "Please enter all the detals",
            })
        }
        // check whether user exists in db
        const user = await User.findOne({emailID: emailId}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not exists, please Signup first and then signIn",
            })
        }
        // unhash and validate password
        if(await bcrypt.compare(password, user.password)){
            // create jwt token
            const payload = {
                emailID: user.emailID,
                id: user._id,
                role: user.accountType,
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24hrs",
            })

            // create cookie
            // adding user to cookie and hiding password
            user.token = token;
            user.password = undefined;
            
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged In Successfully",
                token,
                user
            })

        }
        else{
            return  res.status(401).json({
                success: false,
                message: "Passwords donot match!!",
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// changePassword
exports.changePassword = async (req, res) => {

    try{
        // fetch emailId from body
        // get oldPassword, newPassword, confirmNewPassword
        const {email, password, newPassword} = req.body;
        // validation
        if(!email || !password || !newPassword){
            return res.status(204).json({
                success: false,
                message: "Please enter all the detals",
            })
        }
        // validate old password
        const user = await User.findOne({emailID: email});
        if(await bcrypt.compare(password, user.password)){
            // hash newPassword
            let securePassword;
            try{
                securePassword = await bcrypt.hash(newPassword, 10);
            }
            catch(error){
                return res.status(400).json({
                    success: false,
                    message: "Error in hashing the password",
                })
            }
            // update pwd in DB
            const data = await User.updateOne({emailID: email}, {password: securePassword});
            // sendmail - Password Updated
            await mailSender(email, `Password Change - Update`, passwordUpdated(email, user.firstName));
            //response
            res.status(200).json({
                success: true,
                message: "Password changed Successfully",
            })
        }
        else{
            return res.status(401).json({
                success: false,
                message: "Old password not matched",
            })
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            sucess: false,
            message: "Error in changing password"
        })
    }

}


exports.adminSignIn = async (req, res) => {

    try{
        // fetch data from body
        const {emailId, password} = req.body;
        // validate data
        if(!emailId || !password){
            return res.status(500).json({
                success: false,
                message: "Please enter all the detals",
            })
        }
        // check whether user exists in db
        const user = await User.findOne({emailID: emailId}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not an Admin",
            })
        }
        if(user.accountType !== "Admin"){
            return  res.status(401).json({
                success: false,
                message: "User is not an Admin, please use Student/Instructor route for login",
            })
        }
        // unhash and validate password
        if(await bcrypt.compare(password, user.password)){
            // create jwt token
            const payload = {
                emailID: user.emailID,
                id: user._id,
                role: user.accountType,
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24hrs",
            })

            // create cookie
            // adding user to cookie and hiding password
            user.token = token;
            user.password = undefined;
            
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "Logged In Successfully",
                token,
                user
            })

        }
        else{
            return  res.status(401).json({
                success: false,
                message: "Passwords donot match!!",
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}