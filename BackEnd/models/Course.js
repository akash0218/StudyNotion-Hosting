
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    whatYouWillLearn: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
        required: true,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        }
    ],
    ratingsAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
            required: true,
        }
    ],
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    courseBought: {
        type: Number,
        default: 0
    },
    progressPercentage:{
        type: Number,
    },
    totalDuration: {
        type: String,
    },
    createdAt: {
        type: Date, 
        default: Date.now() 
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    instructions: {
        type: [String],
    },
});

module.exports = mongoose.model("Course", courseSchema);
