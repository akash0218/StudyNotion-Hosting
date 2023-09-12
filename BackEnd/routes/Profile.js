
const express = require("express");
const { updateProfile, deleteAccount, getUserDetails, updateProfilePicture, removeProfilePicture, getEnrolledCourses, instructorDashBoard, getInstructorApprovalRequests, declineInstructorApprovalRequests, approveInstructorApprovalRequests } = require("../controllers/Profile");
const { auth, isInstructor, isAdmin } = require("../middlewares/Auth");
const router = express.Router();

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.put("/updateProfilePicture", auth, updateProfilePicture);
router.delete("/removeProfilePicture", auth, removeProfilePicture);

router.post("/instructorDashBoard", auth, isInstructor, instructorDashBoard);
router.post("/getInstructorApprovalRequests", auth, isAdmin, getInstructorApprovalRequests)
router.delete("/declineInstructorApprovalRequest", auth, isAdmin, declineInstructorApprovalRequests)
router.post("/approveInstructorApprovalRequest", auth, isAdmin, approveInstructorApprovalRequests)

module.exports = router;
