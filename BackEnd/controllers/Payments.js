const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../config/mailSender");
const {courseEnrollmentEmail} = require("../mailTemplates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mailTemplates/paymentSuccessEmail");

const mongoose = require("mongoose");
const crypto = require("crypto");
// initiate the razorpay order
exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide Course Id"
        })
    }

    // calculating the total amount 
    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            // find the course
            course = await Course.findById({_id: course_id})
            if(!course){
                return res.status(200).json({
                    success: false,
                    message: "Course not Found!!"
                })
            }
            // check whether the student is already enrolled in this course
            const uid = new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success: false,
                    message: "Student is already Enrolled in this course!!"
                })
            }

            totalAmount += course.price;
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        // before creating the razorpay instance, we have to give an argument options
        // creating options.
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        // creating order
        try{
            const paymentResponse = await instance.orders.create(options);
            res.status(200).json({
                success: true,
                message: paymentResponse
            })
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Could not Initaite the Order"
            })
        }
    }

}

const enrollStudents = async(courses, user, res) => {
    if(!courses || !user){
        return res.status(400).json({
            success: false,
            message: "Please provide data for Courses or userId"
        })
    }

    console.log("akash")
    for (const courseId of courses){
        
        try{
            //find the course and enroll the student
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: user}},
                {new:true}
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }

            // find the student and add the course to his courses
            const enrollStudent = await User.findByIdAndUpdate(
                {_id: user},
                {
                    $push:{
                        courses: courseId
                    }
                },
                {new: true}
            )

            // send mail to the student
            await mailSender(enrollStudent.emailID, `Successfully Enrolled into ${enrolledCourse.name}`, courseEnrollmentEmail(enrolledCourse.name, enrollStudent.firstName))
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Course enrollment error"
            })
        }

    }

}

// payment verification
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id  = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;
    const user = req.user?.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user || !courses){
        return res.status(200).json({
            success: false,
            message: "Payment Failed!!"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    // we call the final output that we got from hashing as "digest" -- hexadecimal format
    // converting hmac object to string format
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex")

    console.log(expectedSignature)

    if(expectedSignature == razorpay_signature) {
        // payment sucess
        // enroll student
        await enrollStudents(courses, user, res);
        return res.status(200).json({
            success: true,
            message: "Payment verified"
        })
    }
    return res.status(200).json({
        success: "false",
        message: "Payment Failed"
    })
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(enrolledStudent.emailID, `Payment Received`, paymentSuccessEmail(enrolledStudent.firstName, amount/100, orderId, paymentId))
    }
    catch(error){
        console.log("error in sending mail", error);
        return res.status(500).json({
            success: false,
            message: "Could not send email"
        })
    }
}


// capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {

//     try{
//         // we have to know who bought the course and which course
//         // import the data, courseId and userId
//         const {courseId} = req.body;
//         // userID will be in the payload in the req.user which was done while signing in through jwt token
//         const {userId} = req.user.id;
//         // validation for courseId
//         if(!courseId) {
//             return res.json({
//                 success: false,
//                 message: "Please provide valid courseId",
//             })
//         }
//         // valid courseDetail
//         let course;
//         try{
//             course = await Course.findById(courseId);
//             if(!course){
//                 return res.json({
//                     success: false,
//                     message: "Could not find the course",
//                 })
//             }
//             // validate course already bought by the user
//             // we are storing the students enrolled information in Course Schema for that particular course
//             // we have to check whether that studentsEnrolled array contains this userID or not
//             // the userID we have is in the form of String, and the the studentID in StudentsEnrolled is in the form of ObjectID, We have to convert this stringID to ObjectID
//             const user_id = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.contains(user_id)){ // used contains insted of includes?? will it work??
//                 return res.status(200).json({
//                     success: false,
//                     message: "Student is already enrolled in this course"
//                 })
//             }
//         }
//         catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             })
//         }
        
//         // order create
//         // need to find amount
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now().toString()),
//             notes:{
//                 courseId: courseId,
//                 userId
//             }
//         }
//         // call create function
//         try{
//             // initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
            
//             // return the response
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.name,
//                 courseDescription: course.description,
//                 courseThumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount
//             })
//         }
//         catch(error){
//             return res.status(500).json({
//                 success: false,
//                 message: "Could not initiate the payment"
//             })
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         })
//     }

// }


// // verify signature of Razorpay and Server
// exports.verifySignature = async (req, res) => {

//     try{
//         // match the secret key sent from razorpay and server secret key

//         // serversecret
//         const webSecret = "12345678";

//         // signature that is coming from razorpay when the web hook hits => when successful payment happens, sent in req.headers with key "x-razorpay-signature"
//         const signature = req.headers["x-razorpay-signature"];

//         // hash the webhookSecret with hash steps to get the exact password that was sent by razorpay in hashed format
//         // hashing using crypto module
//         // SHA(secure hashing Algorithm) -- which doesnot use any secret key
//         // HMAC -- uses secret_key, we are using this

//         // creating HMAC object, telling that we are using sha256 algo
//         const shaSum = crypto.createHmac("sha256", webSecret);
//         // converting hmac object to string format
//         shaSum.update(JSON.stringify(req.body));
//         // we call the final output that we got from hashing as "digest" -- hexadecimal format
//         const digest = shasum.digest("hex");

//         if(signature === digest){
//             console.log("Payment is Authorized");


//             // Action
//             // enroll student in particular course
//             // this request is not coming from frontend, it is coming from the razorpay when webhook hits
//             // we sent courseId and userId in notes in payload when creating a response
//             // our object will be in req --> body --> payload --> payment --> entity
//             const {courseId, userId} = req.body.payload.payment.entity.notes;

//             // increasing courseBought number for the particular course


//             try{
//                 // fullfill the action
//                 // find the course and enroll
//                 const course = await Course.findByIdAndUpdate({_id: courseId});

//                 const data = await Course.findByIdAndUpdate(
//                     {_id: courseId},
//                     {$push: {studentsEnrolled: userId}, courseBought: course.courseBought+1},
//                     {new: true}
//                 );

//                 if(!course){
//                     return res.status(500).json({
//                         success: false,
//                         message: "Course not found"
//                     })
//                 }

//                 console.log("Enrolled Course", data);

//                 // find the student and update the course in his courses
//                 const user = await User.findByIdAndUpdate(
//                                         {_id: userId},
//                                         {$push: {courses: courseId}},
//                                         {new: true}
//                 );

//                 if(!user){
//                     return res.status(500).json({
//                         success: false,
//                         message: "User not found"
//                     })
//                 }

//                 console.log("Enrolled Course", user);

//                 // send email
//                 // todo attach our template??
//                 const emailResponse = await mailSender(user.emailID, "Congratulations, you are onboarded to new codehelp course", `You have enrolled into ${course.name}`);

//                 return res.status(200).json({
//                     success: true,
//                     message: "Signature Verified and Course Added"
//                 })
//             }
//             catch(error){
//                 return res.status(500).json({
//                     status: false,
//                     message: "Error in verifying the Signature"
//                 })
//             }
//         }
//         else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Signature does not match"
//             })
//         }
//     }
//     catch(error){
//         return res.status(500).json({
//             status: false,
//             message: error.message,
//         })
//     }

// }