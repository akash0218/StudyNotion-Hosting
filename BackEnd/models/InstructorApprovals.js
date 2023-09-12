const mongoose = require("mongoose");

const InstructorApprovalsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    emailID: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Student", "Instructor", "Admin"],
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
})

module.exports = mongoose.model("InstructorApproval", InstructorApprovalsSchema);