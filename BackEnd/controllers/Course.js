const Course = require("../models/Course");
const Category = require("../models/Category");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const {uploadMediaToCloudinary} = require("../config/mediaUpload");
require("dotenv").config();
const {convertSecondsToDuration} = require("./secToDuration");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// create Course
exports.createCourse = async (req, res) => {
    try{
        // fetch data 
        const { name, description, price, tag, whatYouWillLearn, category, status, instructions } = req.body;
        console.log(req.files)
        // get thumbnail
        const thumbnail = req.files.thumbnail;
        
        // validation
        if(!name || !description || !whatYouWillLearn || !price || !category || !tag || !status || !instructions || !thumbnail){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            })
        }

        // check for instructor role
        const userId = req.user.id;
        const instructorDetails = await User.findById({_id: userId});

        if(!instructorDetails){
            return res.status(404).json({
                status: false,
                message: "Instructor Details not found",
            })
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                status: false,
                message: "Category Details not found",
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadMediaToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // entry creation in DB
        const data = await Course.create({
            name: name,
            description: description,
            instructor: instructorDetails._id, // why to use instructorDetails._id, we can use req.user.id, both should be same right?? check while testing..?
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            price: price,
            whatYouWillLearn: whatYouWillLearn,
            tag: tag,
            status: status,
            instructions: instructions
        })

        // update this course to instructor's user schema's course list
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id}, {
                $push: {
                    courses: data._id,
                }
            },
            {new: true}
        )

        // update this course in category's courseList also
        const data1 = await Category.findByIdAndUpdate(
            {_id: categoryDetails._id}, {
                $push: {
                    course: data._id,
                }
            },
            {new: true}
        )

        // response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: data
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating the course"
        })
    }

}

// updateCourse
exports.editCourse = async (req, res) => {
    console.log("akash", "in edit course")
    try{
        // get the required data
        const {name, description, price, tag, whatYouWillLearn, categoryID, courseID, instructions, thumbnailFlag, status} = req.body;
        if(status){
            const data = await Course.findByIdAndUpdate(
                {_id: courseID},
                {
                    status: status
                },
                {new: true}
            )

            return res.status(200).json({
                success: true,
                message: "Course Edited Successfully",
                data: data
            })
        }
        let thumbnailImage = null;
        if(thumbnailFlag == "true"){
            thumbnailImage = req.files.thumbnail;
        }
        // validate whether the user is Instructor or not
        const instructorId = req.user.id;
        const isInstructor = await User.findById({_id: instructorId});
        if(!isInstructor){
            return res.status(500).status({
                success: false,
                message: "You are not allowed to edit the course, only Instructor is allowed to do that"
            })
        }
        
        if(categoryID){
            const category = await Category.findById({_id: categoryID});
            if(!category){
                return res.status(500).json({
                    success: false,
                    message: "Category not Found"
                })
            }
            if(!category.course.includes(courseID)){
                return res.status(500).json({
                    success: false,
                    message: "Course is not created under this category"
                })
            }
        }
        
        let thumbnailImg; 
        if(thumbnailImage != null){
            thumbnailImg = await uploadMediaToCloudinary(thumbnailImage, process.env.FOLDER_NAME);
        }
        
        // update the details
        const data = await Course.findByIdAndUpdate(
            {_id: courseID, category: categoryID},
            {
                name: name,
                description: description,
                instructor: req.user.id, 
                category: categoryID,
                thumbnail: thumbnailImg && thumbnailImg.secure_url,
                price: price,
                whatYouWillLearn: whatYouWillLearn,
                tag: tag,
                instructions: instructions,
            },
            {new: true}
        )
        // return response
        return res.status(200).json({
            success: true,
            message: "Course Edited Successfully",
            data: data
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "error in Editing the Course"
        })
    }

}
// getAllCourses
exports.showAllCourses = async (req, res) => {

    try{
        // show all data
        const data = await Course.find({}, {courseName: true, price: true, thumbnail: true, instructor: true, ratingAndReviews: true, studentsEnrolled: true})
        // response
        res.status(200).json({
            success: true,
            message: "All Courses fetched successfully",
            data: data,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// getCourseDetail -- check again??
exports.getCourseDetails = async (req, res) => {
    try{
        // get courseID
        const {courseId} = req.body;
        // get course from DB
        // populating the details
        const courseDetails = await Course.findById({_id: courseId}).populate(
                                                                        {
                                                                            path: "instructor",
                                                                            populate: {
                                                                                path: "additionalDetails"
                                                                            }
                                                                        }
                                                                    )
                                                                    .populate("category")
                                                                    .populate("ratingsAndReviews")
                                                                    .populate({
                                                                        path: "courseContent",
                                                                        populate:{
                                                                            path:"SubSection"
                                                                        }
                                                                    })
                                                                    .exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseID}`
            })
        }

        
        let totalDurationInSeconds = 0
        courseDetails.totalDuration = "0s"
        for (var j = 0; j < courseDetails.courseContent.length; j++) {
            for (var k=0; k < courseDetails.courseContent[j].SubSection.length; k++){
                totalDurationInSeconds += Number(courseDetails.courseContent[j].SubSection[k].duration);
            }
            courseDetails.totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        }

        return res.status(200).json({
            success: true,
            message: "Course Details fetched Successfully",
            data: courseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// getInstructorCourseDetails
exports.getInstuctorCourseDetails = async (req, res) => {
    try{
        const userId = req.user.id;
        const courses = await Course.find({instructor: userId}).populate(
            {
                path: "courseContent",
                populate: {
                    path: "SubSection"
                }
            }
        ).sort({createdAt: -1})

        for (var i = 0; i < courses.length; i++) {
            let totalDurationInSeconds = 0
            courses[i].totalDuration = "0s"
            for (var j = 0; j < courses[i].courseContent.length; j++) {
                console.log(courses[i].courseContent[j].SubSection)
                for (var k=0; k < courses[i].courseContent[j].SubSection.length; k++){
                    totalDurationInSeconds += Number(courses[i].courseContent[j].SubSection[k].duration);
                }
                console.log(totalDurationInSeconds)
                courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            }
        }

        return res.status(200).json({
            success: true,
            data: courses,
        })
    }
    catch(error){
        console.log("error in fetching the courses of the Instructor");
        console.error(error);
    }
}

// deleteCourse
exports.deleteCourse = async (req, res) => {
    try{
        const userId = req.user.id;
        const {courseId} = req.body;
        
        // delete course from user
        await User.findOneAndUpdate({_id: userId}, {
            $pull: {courses: courseId}
        })
        // find the course
        const course = await Course.findOne({_id: courseId});
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }
        console.log(course, "course")
        //Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled;
        console.log(studentsEnrolled, "course")
        for (const studentId of studentsEnrolled){
            await User.findOneAndUpdate({_id: studentId}, {
                $pull: {courses: courseId}
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent;
        for (const sectionId of courseSections){
            // delete subsections
            const section = await Section.findOne({_id: sectionId})
            if(section){
                const subSections = section.SubSection
                for (const subSectionId of subSections){
                    await SubSection.findOneAndDelete({_id: subSectionId})
                }
            }

            // delete section
            await Section.findOneAndDelete({_id: sectionId})
        }

        // Delete Category
        const category = course.category;
        const updatedCategory = await Category.findOneAndUpdate({_id: category}, {
            $pull: {course: courseId}
        })

        if(updatedCategory.course.length == 0){
            await Category.deleteOne({_id: category})
        }

        // Delete the course
        await Course.findOneAndDelete({_id: courseId})

        return res.status(200).json({
            success: true,
            message: "Course deleted Successfully",
        })
    }
    catch(error){
        console.log("Error in deleting the course");
        console.error(error);
    }
}

// courseBought 
exports.courseBought = async (req, res) => {
    try{
        const {courses} = req.body;
        const userId = req.user.id
        for(const courseId of courses){
            const course = await Course.findById(
                {_id: courseId}
            )
            const courseBought = course.courseBought

            await Course.findByIdAndUpdate(
                {_id: courseId},
                {
                    courseBought: courseBought+1
                }
            )

            const courseProgress = await CourseProgress.create({
                courseId,
                userId
            })

            await User.findByIdAndUpdate(
                {_id: userId},
                {
                    $push: {
                        courseProgress: courseProgress._id
                    }
                }
            )
        }
        return res.status(200).json({
            success: true,
            message: 'Course Bought increment Successfull'
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in incrememnting the course bought"
        })
    }
}