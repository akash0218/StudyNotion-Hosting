
const Section = require("../models/Section");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// createSection
exports.createSection = async (req, res) => {
    console.log("akash", "in section")

    try{
        // data fetch
        const {sectionName, courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success: false,
                message: "Missing Properties",
            })
        }
        // create section
        // missing subsection??
        const newSection = await Section.create({name: sectionName});
        // update section in Course
        const data1 = await Course.findByIdAndUpdate(
                                courseId, 
                                {
                                    $push: {
                                        courseContent: newSection._id
                                    }
                                },
                                {new: true}
                            );
        // how to populate section/subsections in the data
        const data = await Course.findById(courseId).populate({
            path: "courseContent",
            populate:{
                path:"SubSection"
            }
        })
        // return successful response
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            data: data,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in creating the course",
            error: error.message,
        })
    }

}

// Update Section
exports.updateSection = async (req, res) => {
    try{
        // fetch data
        const {sectionName, sectionId, courseId} = req.body;
        console.log(sectionName, sectionId)
        // data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success: false,
                message: "Missing Properties",
            })
        }
        // update data
        await Section.findByIdAndUpdate(
                            sectionId,
                            {name: sectionName},
                            {new: true}
        )
        
        const data = await Course.findOne({_id: courseId}).populate({path: "courseContent", populate:{path: "SubSection"}})
        // return response
        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in creating the course",
            error: error.message,
        })
    }

}

// deleteSection
exports.deleteSection = async (req, res) => {
    console.log("akash")
    try{
        // get Id - assuming that we are sending ID in params like in link deleteSection/:id
        const {sectionId, courseId} = req.body;
        console.log(sectionId)
        // validation
        if(!sectionId){
            console.log(error)
            return res.status(204).json({
                success: false,
                message: "No id given, cannot delete the section"
            })
        }
        const sID = new mongoose.Types.ObjectId(sectionId);
        console.log(sID, "SID");
        // delete entry from DB
        await Section.findByIdAndDelete({_id: sectionId})
        // todo[testing] - do we need to delete entry from the coure schema?? -- Yes we need to delete it
        const data = await Course.findByIdAndUpdate(
            {_id: courseId},
            {$pull: {courseContent: sID}},
            {new: true}
        )
        console.log(data);
        // return response
        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error in deleting the course",
            error: error.message,
        })
    }

}