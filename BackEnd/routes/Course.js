const express = require("express");
const router = express.Router();


// category Controllers
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category")
// course controllers
const {createCourse, showAllCourses, getCourseDetails, editCourse, getInstuctorCourseDetails, deleteCourse, courseBought} = require("../controllers/Course");

// section controllers
const {createSection, updateSection, deleteSection} = require("../controllers/Section");

// sub-section controllers
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");

// rating controllers
const {createRating, getAverageRating, getAllRatingOfCourse, getAllRatings} = require("../controllers/RatingAndReview");

// importing middlewares
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/Auth");
const { getCourseProgress, markLectureAsComplete } = require("../controllers/courseProgress");



/// Course-Routes ///

// create-course --> can only done by Instructors
// so checking it through middlewares
router.post("/createCourse", auth, isInstructor, createCourse);
// creating section
router.post("/createSection", auth, isInstructor, createSection);
// creating subSection
router.post("/createSubSection", auth, isInstructor, createSubSection);
// Updating Course
router.put("/editCourse", auth, isInstructor, editCourse)
// Update section
router.post("/updateSection", auth, isInstructor, updateSection);
// updateSubSection
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// deleteSection
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// deleteSubSection
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
// showAllCOurses
router.get("/getAllCourses", showAllCourses);
// getCourseDetails
router.post("/getCourseDetails", getCourseDetails);
// getInstuctorCourseDetails
router.get("/getInstuctorCourseDetails", auth, isInstructor, getInstuctorCourseDetails);
// deleteCourse
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);



/// category ///
// create category --> can only created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
// showAllCategories
router.get("/getAllCategories", showAllCategories);
// CategoryPageDetails
router.post("/getcategoryPageDetails", categoryPageDetails);

                

/// ratings And Reviews
router.post("/createRating", auth, isStudent, createRating);
// getAverageRating
router.get("/getAverageRating", getAverageRating);
// getAllRatingOfCourse
router.get("/getAllRatingOfCourse", getAllRatingOfCourse);
// fetchAllRatings
router.get("/getAllRatings", getAllRatings);

router.post("/courseBought", auth, isStudent, courseBought)

router.post("/getCourseProgress", auth, isStudent, getCourseProgress)
router.post("/markLectureAsComplete", auth, isStudent, markLectureAsComplete)

module.exports = router;
