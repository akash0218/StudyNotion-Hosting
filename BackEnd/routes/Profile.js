
const express = require("express");
const { updateProfile, deleteAccount, getUserDetails, updateProfilePicture, removeProfilePicture, getEnrolledCourses, instructorDashBoard } = require("../controllers/Profile");
const { auth, isInstructor } = require("../middlewares/Auth");
const router = express.Router();

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.put("/updateProfilePicture", auth, updateProfilePicture);
router.delete("/removeProfilePicture", auth, removeProfilePicture);

router.post("/instructorDashBoard", auth, isInstructor, instructorDashBoard);

module.exports = router;
