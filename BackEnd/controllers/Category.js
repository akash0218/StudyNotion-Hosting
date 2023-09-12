
const mailSender = require("../config/mailSender");
const { categoryApproval } = require("../mailTemplates/categoryApproval");
const { categoryDecline } = require("../mailTemplates/categoryDecline");
const Category = require("../models/Category");
const CategoryRequests = require("../models/CategoryRequests");
const Course = require("../models/Course");

// create CategoryHandler
exports.createCategory = async (req, res) => {

    try{
        // data fetch
        const {name, description} = req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success: true,
                message: "All fields are required",
            })
        }
        const duplicate = await Category.findOne({name: name});
        if(duplicate){
            return res.status(500).json({
                success: false,
                message: "Category already created, Please add description to it"
            })
        }
        // create entry in DB
        const data = await Category.create({
            name, 
            description,
        })
        // response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// getAll Categories 
exports.showAllCategories = async (req, res) => {

    try{
        // show all data
        const allCategories = await Category.find({}, {name: true, description: true})
        // respose
        res.status(200).json({
            success: true,
            message: "All Categories fetched successfully",
            data: allCategories,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }

}

// categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
    try{
        // get categoryID
        const {categoryId} = req.body;
        console.log(categoryId, "incategory")
        // get courses for specified category
        const selectedCategory = await Category.findById({_id: categoryId}).populate({
            path: "course",
            populate:{
                path: "ratingsAndReviews"
            }
        });
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: "Data Not Found",
            })
        }
        // get courses for different categories
        const differentCategories = await Category.find({_id: {$ne: categoryId}}).populate({
            path: "course",
            populate:{
                path:"ratingsAndReviews"
            }
        }).populate({
            path: "course",
            populate:{
                path:"instructor"
            }
        }).exec();
        // get top 10 selling courses
        const topSellingCourses = await Course.find({courseBought: {$ne: 0}}).populate("instructor").populate("ratingsAndReviews").sort({"courseBought": -1}).limit(10);
        // return all courses
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
            },
            message: "Courses fetched successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Something went wrong while fetching all the courses"
        })
    }

}

exports.createCategoryRequest = async(req, res) => {
    try{
        // data fetch
        const {name, description, firstName, lastName, emailID} = req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success: true,
                message: "All fields are required",
            })
        }
        const duplicate = await Category.findOne({name: name});
        if(duplicate){
            return res.status(500).json({
                success: false,
                message: "Category already created, Please add description to it"
            })
        }
        // create entry in DB
        const data = await CategoryRequests.create({
            name, 
            description,
            firstName,
            lastName,
            emailID
        })
        // response
        return res.status(200).json({
            success: true,
            message: "Category Created Successfully",
            data: data
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getCategoryRequests = async(req, res) => {
    try{
        // db call
        const requests = await CategoryRequests.find({});
        // return response
        return res.status(200).json({
            success: true,
            message: "Category Requests Fetched Successfully",
            data: requests,
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in fetching Data",
        })
    }
}

exports.declineCategoryApprovalRequest = async(req, res) => {
    try{
        console.log("akash in category")
        console.log(req.body)
        const {emailId, name, categoryName} = req.body;

        await CategoryRequests.findOneAndDelete({emailID: emailId})
        
        await mailSender(emailId, `Category Request - Update`, categoryApproval(name, categoryName))

        return res.status(200).json({
            success: true,
            message: "Instructor Request Declined Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in Deleting the Request",
        })
    }
}

exports.approveCategoryApprovalRequest = async(req, res) => {
    try{
        const {emailId} = req.body;
        const category = await CategoryRequests.findOne({emailID: emailId})

        const {name, description} = category
        
        await Category.create({
            name, description
        })

        console.log("after")
        
        await mailSender(emailId, `Category Request - Update`, categoryDecline(emailId, name))

        await CategoryRequests.findOneAndDelete({emailID: emailId})

        return res.status(200).json({
            success: true,
            message: "Category Request Accepted Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: true,
            message: "Error in Deleting the Request",
        })
    }
}