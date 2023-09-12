const mongoose = require("mongoose");

const categoryRequestsSchema = new mongoose.Schema({

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
    firstName:{
        type: String,
    },
    lastName: {
        type: String
    },
    emailID: {
        type: String
    }
    
});

module.exports = mongoose.model("CategoryRequest", categoryRequestsSchema);