const CourseProgress = require("../models/CourseProgress");


exports.getCourseProgress = async (req, res) => {
    console.log("akash")
    try{
        const userId = req.user.id;
        const {courseId} = req.body;
        const courseProgress = await CourseProgress.findOne({userId: userId, courseId: courseId})
        console.log(courseProgress, "courseProgress")
        return res.status(200).json({
            success: true,
            data: courseProgress
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting Course Progress"
        })
    }
}

exports.markLectureAsComplete = async (req, res) => {
    try{
        const userId = req.user.id;
        const {courseId, subSectionId} = req.body;
        const completedLectures = await CourseProgress.findOneAndUpdate({userId: userId, courseId: courseId}, {
            $push: {
                completedVideos: subSectionId
            }
        })
        console.log(completedLectures, "courseProgress")
        return res.status(200).json({
            success: true,
            data: completedLectures
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting Course Progress"
        })
    }
}