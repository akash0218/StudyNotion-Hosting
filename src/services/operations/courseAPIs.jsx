import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";
import { toast } from "react-hot-toast";

const {GET_INSTUCTOR_COURSE_DETAILS_API, DELETE_COURSE_API, GET_ALL_CATEGORIES_API, EDIT_COURSE_API, CREATE_COURSE_API, GET_COURSE_DETAILS_API,
        CREATE_SECTION_API, CREATE_SUB_SECTION_API, DELETE_SECTION_API, DELETE_SUB_SECTION_API, UPDATE_SUB_SECTION_API, UPDATE_SECTION_API, GET_COURSE_PROGRESS_API, CREATE_RATING_API, 
        UPDATE_COMPLETED_LECTURE_API, GET_ALL_RATINGS_API
    } = courseEndpoints;

export async function getInstructorCourseDetails(token){
    const toastId = toast.loading("Loading..!!")
    let result = [];
    try{
        const response = await apiConnector("GET", GET_INSTUCTOR_COURSE_DETAILS_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("INSTRUCTOR COURSES API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response.data.data;
    }
    catch(error){
        console.log("Error in getting Instructor Course Details API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteCourse(courseId, token){
    const toastId = toast.loading("Loading..!!!")
    try{
        const response = await apiConnector("DELETE", DELETE_COURSE_API, {courseId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Response Successful", response);
    }
    catch(error){
        console.log("Error in deleting the Course API");
        console.error(error);
    }
    toast.dismiss(toastId);
}

export async function getAllCategories(){
    const toastId = toast.loading("Loading..!!")
    let result = [];
    try{
        const response = await apiConnector("GET", GET_ALL_CATEGORIES_API, null)
        console.log("Categories API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Categories")
        }
        result = response.data.data;
    }
    catch(error){
        console.log("Error in getting Categories API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result;
}

export async function editCourseDetails(token, formData) {
    const toastId = toast.loading("Loading..!!")
    let result = []
    try{
        const response = await apiConnector("PUT", EDIT_COURSE_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Edit Course API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Categories")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Editing Course API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function createCourse(token, formData){
    const toastId = toast.loading("Loading..!!")
    let result = []
    try{
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create Course API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Categories")
        }
        toast.success("Course Created Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Course API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function getCourseDetails(courseId){
    let result = []
    try{
        const response = await apiConnector("POST", GET_COURSE_DETAILS_API, {courseId})
        console.log("Get Course details API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Details")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Course API");
        console.error(error);
    }
    return result
}

export async function createSection(courseId, sectionName, token){
    let result = []
    const toastId = toast.loading("Loading..!!")
    try{
        const response = await apiConnector("POST", CREATE_SECTION_API, {courseId, sectionName}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create Section API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not create section")
        }
        toast.success("Section Created Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Section API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function createSubSection(token, formData){
    const toastId = toast.loading("Loading..!!")
    let result = []
    try{
        const response = await apiConnector("POST", CREATE_SUB_SECTION_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create SubSection API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create SubSection")
        }
        toast.success("SubSection Created Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Course API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function deleteSection(courseId, sectionId, token){
    console.log("akash", "in api")
    let result = []
    const toastId = toast.loading("Loading..!!")
    try{
        const response = await apiConnector("DELETE", DELETE_SECTION_API, {courseId, sectionId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create Section API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not create section")
        }
        toast.success("Section Deleted Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Section API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function deleteSubSection(subSectionId, sectionId, token){
    let result = []
    const toastId = toast.loading("Loading..!!")
    try{
        const response = await apiConnector("DELETE", DELETE_SUB_SECTION_API, {subSectionId, sectionId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create Section API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not delete sub-section")
        }
        toast.success("Sub-Section Deleted Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in deleting Sub-Section API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function updateSubSection(formData, token){
    const toastId = toast.loading("Loading..!!")
    let result = []
    try{
        const response = await apiConnector("POST", UPDATE_SUB_SECTION_API, formData, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Update Section API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not update sub-section")
        }
        toast.success("Sub-Section Updated Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Updating Sub-Section API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function updateSection(data, token){
    const {sectionName, sectionId, courseId} = data;
    const toastId = toast.loading("Loading..!!")
    let result = []
    try{
        const response = await apiConnector("POST", UPDATE_SECTION_API, {sectionName, sectionId, courseId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Update Section API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not update sub-section")
        }
        toast.success("Section Updated Successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Updating Section API");
        console.error(error);
    }
    toast.dismiss(toastId);
    return result
}

export async function getCourseProgress(courseId, token){
    let result = []
    try{
        const response = await apiConnector("POST", GET_COURSE_PROGRESS_API, {courseId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Get Course Progress API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Course Details")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Course API");
        console.error(error);
    }
    return result
}

export async function createRating(token, courseID, rating, review){
    const toastId = toast.loading("Loading..!!")
    try{
        const response = await apiConnector("POST", CREATE_RATING_API, {courseID, rating, review}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Create Rating API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Rate the Course")
        }
        toast.success("Course Rated Successfully")
    }
    catch(error){
        console.log("Error in Rating the Course API");
        console.error(error);
    }
    toast.dismiss(toastId);
}


export async function markLectureAsComplete(courseId, subSectionId, token){
    const toastId = toast.loading("Loading..!!")
    try{
        const response = await apiConnector("POST", UPDATE_COMPLETED_LECTURE_API, {courseId, subSectionId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("Updating Course Completed API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Rate the Course")
        }
        toast.success("Course Completion Updated Successfully")
    }
    catch(error){
        console.log("Error in Rating the Course API");
        console.error(error);
        toast.dismiss(toastId);
        return
    }
    toast.dismiss(toastId);
    return true
}

export async function getRatingsAndReviews(){
    let result = []
    try{
        const response = await apiConnector("GET", GET_ALL_RATINGS_API, null)
        console.log("Get Ratings And Reviews API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Get Ratings And Reviews Details")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Error in Creating Course API");
        console.error(error);
    }
    return result
}





