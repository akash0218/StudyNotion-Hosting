import { apiConnector } from "../apiconnecter"
import { settings } from "../apis"
import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authAPIs"

const {UPDATE_PROFILE_PICTURE_API, REMOVE_PROFILE_PICTURE_API, UPDATE_PROFILE_API, CHANGE_PASSWORD_API, DELETE_PROFILE_API} = settings

export function uploadProfilePicture(token, formData){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData, {
                Authorization: `Bearer ${token}`,
            })
            console.log("response successfull", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
    }
}

export function removeProfilePicture(token, user){
    return async(dispatch) => {
        try{
            console.log(user, "user in settings")    
            const response = await apiConnector("DELETE", REMOVE_PROFILE_PICTURE_API, user, {
                Authorization: `Bearer ${token}`,
            });
            console.log("remove profilepicture response successfull", response);
            if (!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile Picture removed successfully");
            dispatch(setUser(response.data.data))
        }   
        catch(error){
            console.log("Remove display picture error", error);
            toast.error("Could not remove profile picture");
        }
    }
}

export function updateProfile(token, user, data, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            const additionalDetails ={
                about: data.about,
                dateOfBirth: data.DateOfBirth,
                gender: data.gender,
                contactNumber: data.contactNumber
            }
            console.log(additionalDetails);
            const newUser = {...user, additionalDetails}
            dispatch(setUser(newUser))
            localStorage.setItem("user", JSON.stringify(newUser))
            toast.success("Profile details updated Successfully!!!")
            toast.dismiss(toastId)
            navigate("/dashboard/my-profile")
            return
        }
        
        catch(error){
            console.log("Profile Info Updation error", error);
            toast.error("Could not Update profile Info");
        }
        toast.dismiss(toastId)
    }
}

export function changePassword(email, password, newPassword, token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("post", CHANGE_PASSWORD_API, {email, password, newPassword}, {
                Authorization: `Bearer ${token}`,
            })
            console.log("Password Change Response Success", response)
            toast.success("Password updated Successfully!!!")
            navigate("/dashboard/my-profile")
            toast.dismiss(toastId)
            return
        }
        catch(error){
            console.log("Password Updation error", error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
    }
}

export function deleteProfile(token, navigate) {
    console.log("akash")
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFILE_API API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Profile Deleted Successfully")
        dispatch(logout(navigate))
      } catch (error) {
        console.log("DELETE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Delete Profile")
      }
      toast.dismiss(toastId)
    }
  }