import { toast } from "react-hot-toast";
import { courseEndpoints, paymentEndPoints } from "../apis";
import { apiConnector } from "../apiconnecter";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = paymentEndPoints;
const {HANDLE_COURSE_BOUGHT_API} = courseEndpoints

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error){
        console.log("Payment Success email error...", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment....");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        const {courses} = bodyData
        await apiConnector("POST", HANDLE_COURSE_BOUGHT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })
        toast.success("payment Successful, you are added to the course")
        navigate("/dashboard/enrolled-courses")
    }
    catch(error){
        console.log("Payment verification error akash", error)
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId);
    dispatch(resetCart())
    dispatch(setPaymentLoading(false));
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading!!")
    try{
        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("RazorPay SDK failed to load");
            return;
        }
        // order initiate
        // done by capturePayment
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, {courses}, {
            Authorization: `Bearer ${token}`
        })

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }
        // create options
        const option = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course",
            image: rzpLogo,
            prefill: {
                name: userDetails.firstName,
                email: userDetails.emailID
            },
            handler: function(response){
                // send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)
                // verify payment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }
        const paymentObject = new window.Razorpay(option);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("could not make payment")
            console.log(response.error, "Payment API error")
        })
    }
    catch(error){
        console.log("Payment API Eroor", error);
        toast.error("Couldnot make payment")
    }
    toast.dismiss(toastId);
    console.log("akash")
}