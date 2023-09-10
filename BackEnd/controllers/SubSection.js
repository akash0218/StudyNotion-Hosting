
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadMediaToCloudinary } = require("../config/mediaUpload");
const mongoose = require("mongoose");

// create subSection
exports.createSubSection = async (req, res) => {

    try{
        // fetching data
        const {title, description, sectionId, duration} = req.body; 
        // extract file/video from .files.name that we are sending video in through postman
        const video = req.files.video;
        // validating the data
        if(!title || !description || !video || !sectionId || !duration){
            return res.status(401).json({
                success: false,
                message: "Missing Properties",
            })
        }
        // upload video to cloudinary
        // exteact videoUrl
        const videoUrl = await uploadMediaToCloudinary(video, process.env.FOLDER_NAME);
        // update in subsection schema
        const data = await SubSection.create({
            title,
            description,
            videoUrl: videoUrl.secure_url,
            sectionId,
            duration
        })
        // update in section schema
        // HW -- how to log updated section not with id's ?? 
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    SubSection: data._id
                }
            },
            {new: true}
        )
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection created Successfully",
            data: data,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in creating a subSection",
            error: error.message,
        })
    }

}

// update SubSection
exports.updateSubSection = async (req, res) => {
    console.log("akash in updateSubSection")

    try{
        // fetch data
        const {title, description, subSectionId, videoFlag} = req.body;
        console.log(title, subSectionId)
        // get video
        let videoUrl;
        if (videoFlag == "true") {
            const video = req.files.video;
            // upload video to cloudinary
            // extract videoUrl
            videoUrl = await uploadMediaToCloudinary(video, process.env.FOLDER_NAME);
        }

        console.log(videoUrl, "videoUrl")
        
        // update data
        const data = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                description,
                videoUrl: videoUrl && videoUrl.secure_url
            },
            {new: true}
        )
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection updated Successfully",
            updatedCourseDetails: data,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in updating the subSection",
            error: error.message,
        })
    }

}

// delete subsection
exports.deleteSubSection = async (req, res) => {

    try{
        // fetch subsectionID
        const {subSectionId, sectionId} = req.body;
        // delete from db
        if(!subSectionId){
            return res.status(204).json({
                success: false,
                message: "No id given, cannot delete the subSection"
            })
        }
        const sID = new mongoose.Types.ObjectId(subSectionId);
        // delete entry from DB
        await SubSection.findByIdAndDelete({_id: subSectionId})
        // todo[testing] - do we need to delete entry from the Section schema?? 
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {$pull: {SubSection: sID}},
            {new: true}
        )
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection Deleted Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in deleting the subSection",
            error: error.message,
        })
    }
}
