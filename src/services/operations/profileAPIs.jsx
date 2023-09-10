import { apiConnector } from "../apiconnecter";
import { profileEndPoints } from "../apis"
import { toast } from "react-hot-toast";

const {GET_PROFILE_ENROLLED_COURSES_API, GET_INSTRUCTOR_DASHBOARD_API} = profileEndPoints;

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