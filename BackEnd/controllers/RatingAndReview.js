
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");


// createRating
exports.createRating = async (req, res) => {

    try{
        // fetch courseID, userID
        const userID = req.user.id;
        const {rating, review, courseID} = req.body;

        // validate data
        // check if user is enrolled or not and if check if student already given or not
        const course = await Course.findById({_id: courseID, studentsEnrolled: {$elemMatch: {$eq: userID}}});
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in course",
            })
        }
        console.log("before alreadyExists", course)
        // create rating and review
        // const uID = new mongoose.Types.ObjectId(userID); // check if this is needed or not???
        // const cID = new mongoose.Types.ObjectId(courseID); // check if this is needed or not???
        const alreadyExists = await RatingAndReview.findOne({user: userID, course: course._id});
        console.log(alreadyExists, "after alreadyExists")
        if(alreadyExists){
            return res.status(403).json({
                success: false,
                message: "user already rated this course",
            })
        }

        
        
        const data = await RatingAndReview.create(
                                    {
                                        user: userID,
                                        rating,
                                        review,
                                        course: courseID,
                                    }
        )
        // add it to course model
        await Course.findByIdAndUpdate({_id: courseID}, {
                                        $push : {ratingsAndReviews: data._id}
                                    },
                                    {new: true}
                                )
        // return response
        return res.status(200).json({
            success: true,
            message: "Rated the course successfully",
            data: data,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in rating the course"
        })
    }

}

// getAverageRating
exports.getAverageRating = async (req, res) => {

    try{
        // find courseID
        const {courseID} = req.body;
        // calculate Average Rating
        const result = await RatingAndReview.aggregate(
            {
                // we are matching on the basis of course id
                $match: {
                    course: new mongoose.Types.ObjectId(courseID)
                },
            },
            // and then group those entries on the basis of _id, null means there is no particular criteria for us here for the particular course, and we made the average using $avg for rating
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        )
        
        console.log(result); // check this???? for sure

        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }
        
        // if no rating exists
        return res.status(200).json({
            success: false,
            message: "Average Rating is 0, no ratings found for this course",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while calculating the average"
        })
    }

}


// getAllRatings for a course
exports.getAllRatingOfCourse = async (req, res) => {

    try{
        // get courseID
        const {courseID} = req.body;
        // DB call
        const allRatingsAndReviews = await RatingAndReview.find({course: new mongoose.Types.ObjectId(courseID)}).populate({
                                                                                                                    path: "user",
                                                                                                                    select: "firstName lastName email image"
                                                                                                                })
                                                                                                                .exec();
        // return response
        return res.status(200).json({
            success: true,
            message: "Ratings fetched successfully",
            data: allRatingsAndReviews,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in getting all the ratings of the course",
        })
    }

}

// get All Ratings
exports.getAllRatings = async (req, res) => {

    console.log("akash")

    try{
        const allReviews = await RatingAndReview.find({}).sort({rating: "desc"}).populate({
                                                                                    path: "user",
                                                                                    firstName: true,
                                                                                    lastName: true,
                                                                                    emailID: true,
                                                                                    image: true,
                                                                                })
                                                                                .populate({
                                                                                    path: "course",
                                                                                    name: true,
                                                                                })
                                                                                .exec();
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews
        })  
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in getting all the ratings"
        })
    }

}