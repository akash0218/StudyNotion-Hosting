import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { createCourse, getAllCategories, editCourseDetails, getCourseDetails } from '../../../../../services/operations/courseAPIs'
import { useEffect } from 'react'
import ChipInput from './ChipInput'
import Upload from '../Upload'
import RequirementsField from './RequirementsField'
import { setStep, setCourse } from '../../../../../slices/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../Common/IconBtn'
import { MdNavigateNext } from "react-icons/md"
import { toast } from 'react-hot-toast'

const CourseInformationForm = () => {

    const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: {errors} 
    } = useForm()

    const COURSE_STATUS = {
      DRAFT: "Draft",
      PUBLISHED: "Published",
    }

    const {editCourse, course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
    const [categories, setCourseCategories] = useState([]);
    const dispatch = useDispatch();

    const getCategories = async () => {
      setLoading(true);
      const categories = await getAllCategories();

      if(categories.length > 0){
        setCourseCategories(categories)
      }

      setLoading(false);
    }

    useEffect(() => {
      if(editCourse){
        setValue("courseTitle", course.name)
        setValue("courseDescription", course.description)
        setValue("coursePrice", course.price)
        setValue("courseImage", course.thumbnail)
        setValue("courseTags", course.tag)
        setValue("courseBenefits", course.whatYouWillLearn)
        setValue("courseCategory", course.category)
        setValue("courseRequirements", course.instructions)
      }
      getCategories()
    }, [])

    const isFormUpdated = () => {
      const currentValues = getValues()
      if (
        currentValues.courseTitle !== course.name ||
        currentValues.courseDescription !== course.description ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail
      ){
        return true
      }
      return false
    }

    const onSubmit = async (data) => {
      console.log(getValues(), "in OnSubmit")
      console.log(data)
      let thumbnailFlag = false;
      console.log(editCourse);
      if (editCourse){
        if(isFormUpdated()) {
          const currentValues = getValues()
          const formData = new FormData()
          formData.append("courseID", course._id)
          if (currentValues.courseTitle !== course.name) {
            formData.append("name", data.courseTitle)
          }
          if (currentValues.courseDescription !== course.description) {
            formData.append("description", data.courseDescription)
          }
          if (currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice)
          }
          if (currentValues.courseTags !== course.tag) {
            formData.append("tag", data.courseTags)
          }
          if (currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits)
          }
          if (currentValues.courseCategory._id !== course.category._id) {
            formData.append("categoryID", data.courseCategory)
          }
          if (
            currentValues.courseRequirements !==
            course.instructions
          ){
            formData.append(
              "instructions",
              data.courseRequirements
            )
          }
          if (currentValues.courseImage !== course.thumbnail) {
            formData.append("thumbnail", data.courseImage)
            thumbnailFlag = true
          }
          formData.append("thumbnailFlag", thumbnailFlag)
          setLoading(true)
          const result = await editCourseDetails(token, formData)
          setLoading(false)
          if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
          }
        }
        else{
          toast.error("No Changes made to the form")
        }
        return
      }

      const formData = new FormData()
      formData.append("name", data.courseTitle)
      formData.append("description", data.courseDescription)
      formData.append("price", data.coursePrice)
      formData.append("tag", data.courseTags)
      formData.append("whatYouWillLearn", data.courseBenefits)
      formData.append("category", data.courseCategory)
      formData.append("status", COURSE_STATUS.DRAFT)
      formData.append("instructions", data.courseRequirements)
      formData.append("thumbnail", data.courseImage)
      setLoading(true)
      const result = await createCourse(token, formData)
      if (result) {
        dispatch(setStep(2))
        dispatch(setCourse(result))
      }
      setLoading(false)
    }

    return (
      <form className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Course Title */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseTitle' className="text-sm text-richblack-5">
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id='courseTitle'
            placeholder='Enter Course Title'
            {...register("courseTitle", {required: true})}
            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
          />
          {
            errors.courseTitle && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course title is required
              </span>
            )
          }
        </div>

        {/* course description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseDescription' className="text-sm text-richblack-5">
            Course Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id='courseDescription'
            placeholder='Enter Course Description'
            {...register("courseDescription", {required: true})}
            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none resize-x-none min-h-[130px] w-full'
          />
          {
            errors.courseDescription && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Description is required
              </span>
            )
          }
        </div>

        {/* coursePrice */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='coursePrice' className="text-sm text-richblack-5">
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className='relative'> 
            <input
              id='coursePrice'
              placeholder='Enter Course Price'
              {...register("coursePrice", {required: true, valueAsNumber: true, pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                }
              })}
              className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full !pl-12'
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>
          {
            errors.coursePrice && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course Price is required
              </span>
            )
          }
        </div>

        {/* course category */}
        <div className="flex flex-col space-y-2">
          <label htmlFor='courseCategory' className="text-sm text-richblack-5">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            id='courseCategory'
            defaultValue=""
            {...register("courseCategory", {required: true})}
            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {
              !loading &&
              categories?.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))
            }
          </select>
          {
            errors.courseCategory && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Course title is required
              </span>
            )
          }
        </div>

        {/* course Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Course Thumbnail */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseBenefits" className="text-sm text-richblack-5">
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id='courseBenefits'
            placeholder='Enter benefits of the course'
            {...register("courseBenefits", { required: true })}
            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none resize-x-none min-h-[130px] w-full"
          />
          {
            errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Requirements */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-x-2">
          { editCourse &&
            <button
              onClick={()=>dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Without Saving
            </button>
          }
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>

      </form>
    )
}

export default CourseInformationForm
