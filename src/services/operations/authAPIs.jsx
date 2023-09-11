import { toast } from "react-hot-toast";
import {setLoading, setToken} from "../../slices/authSlice"
import { apiConnector } from "../apiconnecter";
import { authEndPoints } from "../apis";
import { setUser } from "../../slices/profileSlice";

export function sendOTP(email, navigate){

    const SENDOTP_API = authEndPoints.SENDOTP_API;

    return async(dispatch) => {

        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SENDOTP_API, {email});
            console.log("OTP response successfull");

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        }
        catch(error){
            const {message} = error.response.data;
            console.log("Error in sending OTP");
            toast.error(message);
        }

        dispatch(setLoading(false));
    }
}

export function signUp(firstName, lastName, emailId, password, confirmPassword, accountType, otp, navigate) {
    const SIGNUP_API = authEndPoints.SIGNUP_API;

    return async(dispatch) => {
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SIGNUP_API, {firstName, lastName, emailId, password, confirmPassword, accountType, otp});
            console.log("SignUp response Successfull");

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("SignUp Successfull");
            navigate("/login");
        }
        catch(error){
            const {message} = error.response.data;
            toast.error(message)
            navigate("/verify-email")
        }

        dispatch(setLoading(false));
    }
}

export function signIn(emailId, password, navigate) {
    const SIGNIN_API = authEndPoints.SIGNIN_API;

    return async(dispatch) => {
        const toastId = toast.loading("Loading..!!")
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", SIGNIN_API, {emailId, password})
            console.log("SIGN IN response successful", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const {token} = response.data;
            dispatch(setToken(token));
            const userImage = response.data?.user?.image
                ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")
        }
        catch(error){
            const {message} = error.response.data;
            toast.error(message)
            toast.dismiss(toastId);
            navigate("/login")
            return
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent) {

    const RESETPASSWORD_API = authEndPoints.RESETPASSTOKEN_API;
    return async(dispatch) => {
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {email})
            console.log(response);
            console.log("Reset password token response successfull");

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error){
            console.log("Reset Password Token Error");
            toast.error(error.message)
        }
        
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {

    const RESETPASSWORD_API = authEndPoints.RESETPASSWORD_API;
    return async(dispatch) => {
        dispatch(setLoading(true));

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token});
            console.log(response);
            console.log("Reset password response successfull");

            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password updated successfully");
            navigate("/login")
        }
        catch(error){
            const {message} = error.response.data;
            console.log(error);
            toast.error(message)
            console.log("Error in resetting the password");
        }

        dispatch(setLoading(false));
    }
}

export function logout(navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading..!!")
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.dismiss(toastId);
        toast.success("Logged Out")
        navigate("/")
    }
}
