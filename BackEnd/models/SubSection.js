
const mongoose = require("mongoose");

const subsectionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String,
        required: true,
        trim: true,
    }  
});

module.exports = mongoose.model("SubSection", subsectionSchema);