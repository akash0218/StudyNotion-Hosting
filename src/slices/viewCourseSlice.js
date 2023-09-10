import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSectionData: localStorage.getItem("courseSectionData") ? JSON.parse(localStorage.getItem("courseSectionData")) : [],
    courseEntireData: localStorage.getItem("courseEntireData") ? JSON.parse(localStorage.getItem("courseEntireData")) : [],
    completedLectures: localStorage.getItem("completedLectures") ? JSON.parse(localStorage.getItem("completedLectures")) : [],
    totalNoOfLectures: localStorage.getItem("totalNoOfLectures") ? JSON.parse(localStorage.getItem("totalNoOfLectures")) : 0, 
    videoLoading: false
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.courseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures: (state, action) => {
        state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
        setVideoLoading: (state, action) => {
            state.videoLoading = action.payload
        }
    }
})

export const {
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLectures,
    setVideoLoading
} = viewCourseSlice.actions
  
export default viewCourseSlice.reducer