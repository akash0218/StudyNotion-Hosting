import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { getCourseDetails, getCourseProgress } from '../services/operations/courseAPIs';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, setVideoLoading } from '../slices/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const {videoLoading} = useSelector((state) => state.viewCourse)

    const [reviewModal, setReviewModal] = useState(false);

    useEffect(() => {
      ;(async() => {
        dispatch(setVideoLoading(true))
        const course = await getCourseDetails(courseId);
        const courseProgress = await getCourseProgress(courseId, token)
        dispatch(setCourseSectionData(course.courseContent))
        dispatch(setEntireCourseData(course))
        dispatch(setCompletedLectures(courseProgress.completedVideos))
        let lectures = 0
        course.courseContent?.forEach((section) => {
          lectures += section.SubSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
        dispatch(setVideoLoading(false))
      })()
    }, [])

    if(videoLoading){
      return (
          <div className="flex h-screen items-center justify-center">
            <div className="spinner"></div>
          </div>
      )
    }

    return (
      <div>
          <div className="relative flex min-h-[calc(100vh-3.5rem)]">
              <VideoDetailsSideBar setReviewModal={setReviewModal}/>
              <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-6">
                  <Outlet/>
                </div>
              </div>
          </div>
          {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
      </div>
    )
}

export default ViewCourse
