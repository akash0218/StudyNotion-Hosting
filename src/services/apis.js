const BASE_URL = process.env.REACT_APP_BASE_URL


// Auth end-points
export const authEndPoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    SIGNIN_API: BASE_URL + "/auth/signIn"
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact"  
}

// categories end-points
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    GET_CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getcategoryPageDetails"
};

//settings end-points
export const settings = {
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateProfilePicture",
    REMOVE_PROFILE_PICTURE_API: BASE_URL + "/profile/removeProfilePicture",

    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile"
}

//profile end points
export const profileEndPoints = {
    GET_PROFILE_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DASHBOARD_API: BASE_URL + "/profile/instructorDashBoard"
}

// course end points
export const courseEndpoints = {
    GET_INSTUCTOR_COURSE_DETAILS_API: BASE_URL + "/course/getInstuctorCourseDetails",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_ALL_CATEGORIES_API: BASE_URL + "/course/getAllCategories",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    GET_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    CREATE_SUB_SECTION_API: BASE_URL + "/course/createSubSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUB_SECTION_API: BASE_URL + "/course/deleteSubSection",
    UPDATE_SUB_SECTION_API: BASE_URL + "/course/updateSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    HANDLE_COURSE_BOUGHT_API: BASE_URL + "/course/courseBought",
    GET_COURSE_PROGRESS_API: BASE_URL + "/course/getCourseProgress",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    UPDATE_COMPLETED_LECTURE_API: BASE_URL + "/course/markLectureAsComplete",
    GET_ALL_RATINGS_API: BASE_URL + "/course/getAllRatings"
}

// payment end points
export const paymentEndPoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail"
}