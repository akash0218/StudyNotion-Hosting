import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setStep, setCourse, setEditCourse } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../Common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { editCourseDetails } from '../../../../../services/operations/courseAPIs'

const PublishCourse = () => {

    const {
      register,
      handleSubmit,
      setValue,
      getValues
    } = useForm()

    const COURSE_STATUS = {
      DRAFT: "Draft",
      PUBLISHED: "Published",
    }

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    useEffect(() => {
      if(course?.status === COURSE_STATUS.PUBLISHED){
        setValue("public", true)
      }
    }, [])

    const goBack = () => {
      dispatch(setStep(2))
    }

    const handleCoursePublish = async () => {
      if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
        dispatch(setStep(1))
        dispatch(setEditCourse(false))
        dispatch(setCourse(null))
        navigate("/dashboard/my-courses")
        return
      }

      const formData = new FormData()
      formData.append("courseID", course._id)
      formData.append("status", getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT)
      setLoading(true)
      const result = await editCourseDetails(token, formData)
      dispatch(setStep(1))
      dispatch(setEditCourse(false))
      dispatch(setCourse(null))
      navigate("/dashboard/my-courses")
      return
    }

    const onSubmit = (data) => {
      handleCoursePublish()
    }

    return (
      <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          Publish Settings
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* checkBox */}
          <div className="my-6 mb-8">
            <label htmlFor="public" className="inline-flex items-center text-lg">
              <input
                type='checkbox'
                id='public'
                {...register("public")}
                className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
              />
              <span className="ml-2 text-richblack-400">
                Make this course as public
              </span>
            </label>
          </div>

          {/* buttons */}
          <div className="ml-auto flex max-w-max items-center gap-x-4">
            <button
              disabled={loading}
              type='button'
              onClick={goBack}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              Back
            </button>

            <IconBtn disabled={loading} text="Save Changes"/>
          </div>
        </form>
      </div>
    )
}

export default PublishCourse
