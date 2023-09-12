const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    console.log("in auth")
    try{
        // fetching token
        const token = req.body.token || req.cookies.token || (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : false);
        // token missing
        if(!token){
            return res.status(500).json({
                success: false,
                message: "Token missing!!!",
            })
        }

        // verify token
        try{
            const payload = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Error while verifying the token",
            })
        }
        console.log("akash")
        next();
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error while verifying the token",
        })
    }
}

// isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Student"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "User Role is not matching"
        })
    }

}

// isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "User Role is not matching"
        })
    }

}

// isAdmin
exports.isAdmin = async(req, res, next) => {
    console.log("in admin")
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin"
            })
        }
        console.log("donti")
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "User Role is not matching"
        })
    }

}
