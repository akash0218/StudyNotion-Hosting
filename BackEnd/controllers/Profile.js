const Profile = require("../models/Profile");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadMediaToCloudinary } = require("../config/mediaUpload");
const {convertSecondsToDuration} = require("./secToDuration");
const CourseProgress = require("../models/CourseProgress");
const InstructorApprovals = require("../models/InstructorApprovals");
const mailSender = require("../config/mailSender");
const { instructorApproval } = require("../mailTemplates/instructorApproval");
const { instructorDecline } = require("../mailTemplates/instructorDecline");

// update Profile, since we are creating null values at the time of Sign up the user
exports.updateProfile = async (req, res) => {

    try{
        console.log(req.body, "in Update Profile");
        // fetch data
        const {gender, contactNumber, DateOfBirth="", about=""} = req.body;
        // we are logged in and we have user paramater in req that was added into req.user = payload at the time of middleware authentication
        // fetch userId from req.user
        const id = req.user.id;
        // validation
        if(!id){
            return res.status(204).json({
                success: false,
                message: "Error in Updating the Profile",
                error: error.message,
            })
        }
        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        // update profile info in db
        profileDetails.dateOfBirth = DateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        // we use .save() to save the details in our DB since the object is already created at the time of sign up
        await profileDetails.save()

        // return response
        return res.status(200).json({
            success: true,
            data: profileDetails,
            message: "Profile Updated Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in Updating the Profile",
            error: error.message,
        })
    }

}

// deleteAccount
exports.deleteAccount = async (req, res) => {

    try{
        // get Id
        const id = req.user.id;
        const userDetails = await User.findById(id);
        // validation
        if(!userDetails){
            return res.status(204).json({
                success: false,
                message: "Insufficient details",
            })
        }
        // get profile Id
        const profileId = userDetails.additionalDetails;
        // delete Profile
        await Profile.findByIdAndDelete(profileId);
        // delete User
        await User.findByIdAndDelete({_id: id});
        // return response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in deleting the Profile",
            error: error.message,
        })
    }

}

// getAllUserDetlails
exports.getUserDetails = async (req, res) => {

    try{
        // fetch ID
        const id = req.user.id;
        // db call
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        // return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in fetching Data",
        })
    }

}

//get Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
    try{
        const userID = req.user.id;
        let userDetails = await User.findOne({
            _id: userID,
          })
            .populate({
              path: "courses",
              populate: {
                path: "courseContent",
                populate: {
                  path: "SubSection",
                },
              },
            })
            .exec()
        
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            var SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                for (var k=0; k < userDetails.courses[i].courseContent[j].SubSection.length; k++){
                    let temp = userDetails.courses[i].courseContent[j].SubSection[k].duration;
                    totalDurationInSeconds += Number(temp)
                }
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
                SubsectionLength += userDetails.courses[i].courseContent[j].SubSection.length
                }
                let courseProgressCount = await CourseProgress.findOne({
                    courseId: userDetails.courses[i]._id,
                    userId: userID,
                })
                courseProgressCount = courseProgressCount ? courseProgressCount?.completedVideos.length : 0;
                if (SubsectionLength === 0) {
                    userDetails.courses[i].progressPercentage = 100
                } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                    Math.round(
                    (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
                }
            }
            
        return res.status(200).json({
            success: true,
            data: userDetails.courses
        })
        
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//updateDisplayPicture
exports.updateProfilePicture = async (req, res) => {
    try{
        // get file from request
        const dp = req.files.displayPicture;
        // get the userID
        const userID = req.user.id;
        // upload it to cloudinary and get the link
        const image = await uploadMediaToCloudinary(
            dp,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        // update the link in User DB
        const response = await User.findByIdAndUpdate(
            {_id: userID},
            {image: image.secure_url},
            {new: true}
        )
        // return the response
        return res.status(201).json({
            success: true,
            message: "Display Picture Updated Successfully",
            data: response,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating the profile picture",
        })
    }

}

//removeProfilePicture
exports.removeProfilePicture = async (req, res) => {
    try{
        console.log(req);
        const userId = req.user.id;
        const {firstName, lastName} = req.body;   
        const response = await User.findByIdAndUpdate(
            {_id: userId},
            {image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`},
            {new: true}
        )

        req.body.image = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

        return res.status(201).json({
            success: true,
            message: "Profile Picture removed successfully",
            data: response
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in deleting the profile picture"
        })
    }
}

exports.instructorDashBoard = async(req, res) => {
    try{
        const courseDetails = await Course.find({
            instructor: req.user.id
        })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price


            const courseDataWithStats= {
                _id: course._id,
                courseName: course.name,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDataWithStats
        })

        return res.status(200).json({
            success: true,
            data: courseData
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.getInstructorApprovalRequests = async(req, res) => {
    try{
        // db call
        const requests = await InstructorApprovals.find({}).populate("additionalDetails");
        // return response
        return res.status(200).json({
            success: true,
            message: "Instructor Requests Fetched Successfully",
            data: requests,
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in fetching Data",
        })
    }
}

exports.declineInstructorApprovalRequests = async(req, res) => {
    try{
        const {emailId, name} = req.body;

        console.log()

        await InstructorApprovals.findOneAndDelete({emailID: emailId})
        
        await mailSender(emailId, `Instructor Request - Update`, instructorApproval(emailId, name))

        return res.status(200).json({
            success: true,
            message: "Instructor Request Declined Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in Deleting the Request",
        })
    }
}

exports.approveInstructorApprovalRequests = async(req, res) => {
    try{
        const {emailId} = req.body;

        const user = await InstructorApprovals.findOne({emailID: emailId})

        const {firstName, lastName, emailID, password, accountType, image, additionalDetails} = user
        
        await User.create({
            firstName,
            lastName,
            emailID,
            password,
            accountType,
            image,
            additionalDetails
        })
        
        await mailSender(emailId, `Instructor Request - Update`, instructorDecline(emailId, firstName))

        await InstructorApprovals.findOneAndDelete({emailID: emailId})

        return res.status(200).json({
            success: true,
            message: "Instructor Request Accepted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in Deleting the Request",
        })
    }
}