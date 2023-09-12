import { apiConnector } from "../apiconnecter";
import { profileEndPoints } from "../apis"
import { toast } from "react-hot-toast";

const {GET_PROFILE_ENROLLED_COURSES_API, GET_INSTRUCTOR_DASHBOARD_API, GET_INSTRUCTOR_APPROVAL_REQUESTS_API, 
    DECLINE_INSTRUCTOR_APPROVAL_REQUESTS_API, APPROVE_INSTRUCTOR_APPROVAL_REQUESTS_API} = profileEndPoints;

export async function getProfileEnrolledCourses(token){
    const toastId = toast.loading("Loading..!!");
    let result = []

    try{
        const response = await apiConnector("GET", GET_PROFILE_ENROLLED_COURSES_API, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response.data.data, "response")
        result = response.data.data
    }
    catch(error){
        console.log("Get Profile Enrolled Courses API Error", error);
        toast.error("Could not Fetch the courses");
    }
    toast.dismiss(toastId);
    return result;

}

export async function getInstructorDashBoard(token){
    const toastId = toast.loading("Loading..!!");
    let result = []

    try{
        const response = await apiConnector("POST", GET_INSTRUCTOR_DASHBOARD_API, null, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response.data.data, "response")
        result = response.data.data
    }
    catch(error){
        console.log("Get Instructor Dashboard API Error", error);
        toast.error("Could not Fetch the Instructor courses");
    }
    toast.dismiss(toastId);
    return result;
}

export async function getInstructorApprovalRequests(token){
    const toastId = toast.loading("Loading..!!");
    let result = []

    try{
        const response = await apiConnector("POST", GET_INSTRUCTOR_APPROVAL_REQUESTS_API, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("akash, in get")
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        console.log(response.data.data, "response")
        result = response.data.data
    }
    catch(error){
        console.log("Get Instructor Dashboard API Error", error);
        toast.error("Could not Fetch the Instructor Approval Requests");
    }
    toast.dismiss(toastId);
    return result;
}

export async function declineInstructorApprovalRequest(emailId, name, token){
    const toastId = toast.loading("Loading..!!");
    try{
        const response = await apiConnector("DELETE", DECLINE_INSTRUCTOR_APPROVAL_REQUESTS_API, {emailId, name}, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Instructor Approval Request Declined Successfully")
    }
    catch(error){
        console.log("Decline Instructor Approval API Error", error);
        toast.error("Could not Delete the Instructor Approval Requests");
        return false
    }
    toast.dismiss(toastId);
    return true
}

export async function approveInstructorApprovalRequest(emailId, token){
    const toastId = toast.loading("Loading..!!");
    try{
        const response = await apiConnector("POST", APPROVE_INSTRUCTOR_APPROVAL_REQUESTS_API, {emailId}, {
            Authorization: `Bearer ${token}`,
        })
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Instructor Approval Request Approved Successfully")
    }
    catch(error){
        console.log("Approve Instructor Approval API Error", error);
        toast.error("Could not Approve the Instructor Approval Requests");
        return false
    }
    toast.dismiss(toastId);
    return true
}
