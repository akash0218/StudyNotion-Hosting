
const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedVideos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
            default: []
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }

});

module.exports = mongoose.model("CourseProgress", courseProgressSchema);
