import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from "react-icons/rx"
import Upload from '../Upload';
import IconBtn from '../../../../Common/IconBtn';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { createSubSection, getCourseDetails, updateSubSection } from '../../../../../services/operations/courseAPIs';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { BsCheckLg } from 'react-icons/bs';

const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false
}) => {

    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    function convertSecondsToDuration(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = Math.floor((totalSeconds % 3600) % 60)
      
        if (hours > 0) {
          return `${hours}h ${minutes}m ${seconds}s`
        } else if (minutes > 0) {
          return `${hours}h ${minutes}m ${seconds}s`
        } else {
          return `${hours}h ${minutes}m ${seconds}s`
        }
      }
      
    const {
        register, 
        handleSubmit,
        setValue,
        formState: {errors},
        getValues,
    } = useForm();

    useEffect(() => {
        const duration = convertSecondsToDuration(modalData.duration)
        console.log(duration.split(' ')[0][0])
        if (view || edit) {
          setValue("lectureTitle", modalData.title)
          setValue("lectureDescription", modalData.description)
          setValue("lectureVideo", modalData.videoUrl)
          setValue("lectureTimeHrs", duration.split(' ')[0][0])
          setValue("lectureTimeMns", duration.split(' ')[1][0])
          setValue("lectureTimeScs", duration.split(' ')[2][0])
        }
    }, [])

    // detect whether form is updated or not
    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
        currentValues.lectureTitle !== modalData.title ||
        currentValues.lectureDescription !== modalData.description ||
        currentValues.lectureVideo !== modalData.videoUrl
        ) {
        return true
        }
        return false
    }

    const handleEditSubSection = async () => {
        const currentValues = getValues()
        const formData = new FormData()
        let videoFlag;
        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)
        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }
        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDescription)
        }
        if (currentValues.lectureVideo !== modalData.videoUrl) {
            videoFlag = true;
            formData.append("video", currentValues.lectureVideo)
        }
        formData.append("videoFlag", videoFlag)
        setLoading(true)
        await updateSubSection(formData, token)
        const updatedCourse = await getCourseDetails(course._id)
        if(updatedCourse){
            dispatch(setCourse(updatedCourse))
        }
        setLoading(false);
        setModalData(null);

    }

    const onSubmit = async (data) => {
        if(view) {
            return
        }
        if(edit){
            if(!isFormUpdated()){
                toast.error("No Changes made to form")
            } else{
                handleEditSubSection();
            }
            return
        }
        const duration = String(Number(data.lectureTimeHrs * 60 * 60) + Number(data.lectureTimeMns * 60) + Number(data.lectureTimeScs));
        const formData = new FormData()
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDescription)
        formData.append("video", data.lectureVideo)
        formData.append("duration", duration)
        setLoading(true)
        await createSubSection(token, formData)
        const updatedCourse = await getCourseDetails(course._id)
        if(updatedCourse){
            dispatch(setCourse(updatedCourse))
        }
        setLoading(false);
        setModalData(null);
    }


    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

                {/* Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
                    <p className="text-xl font-semibold text-richblack-5">
                        {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
                    </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                {/* Modal Form */}
                <form
                onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8 px-8 py-10"
                >
                    {/* Video Lecture */}
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    {/* Lecture Titile */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle", {required: true})}
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                        />
                        {errors.lectureTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture title is required
                        </span>
                        )}
                    </div>


                    {/* Lecture Time */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Video Playback Time {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <div className='flex justify-between gap-6'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex'>
                                    <input
                                        disabled={view || loading}
                                        id='lectureTimeHrs'
                                        placeholder='HH'
                                        {...register("lectureTimeHrs")}
                                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full relative'
                                    />
                                    {
                                        !view && 
                                        <div className='absolute text-richblack-300 ml-[170px] flex flex-col mt-3 text-[12px] cursor-pointer'>
                                            <AiOutlineUp onClick={()=>{
                                                let temp = document.getElementById("lectureTimeHrs").value ? Number(document.getElementById("lectureTimeHrs").value) : 0
                                                document.getElementById("lectureTimeHrs").value = temp+1
                                            }}/>
                                            <AiOutlineDown onClick={() => {
                                                let temp = document.getElementById("lectureTimeHrs").value ? Number(document.getElementById("lectureTimeHrs").value) : 0
                                                document.getElementById("lectureTimeHrs").value = (temp && temp!= 0) ? temp-1 : 0
                                            }}/>
                                        </div>
                                    }
                                </div>
                                <div className='text-richblack-300'>
                                    HH
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex'>
                                    <input
                                        disabled={view || loading}
                                        id='lectureTimeMns'
                                        placeholder='MM'
                                        {...register("lectureTimeMns")}
                                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full relative'
                                    />
                                    {
                                        !view &&
                                        <div className='absolute text-richblack-300 ml-[170px] flex flex-col mt-3 text-[12px] cursor-pointer'>
                                            <AiOutlineUp onClick={()=>{
                                                let temp = document.getElementById("lectureTimeMns").value ? Number(document.getElementById("lectureTimeMns").value) : 0
                                                document.getElementById("lectureTimeMns").value = temp != 59 ? temp+1 : 0
                                            }}/>
                                            <AiOutlineDown onClick={() => {
                                                let temp = document.getElementById("lectureTimeMns").value ? Number(document.getElementById("lectureTimeMns").value) : 0
                                                document.getElementById("lectureTimeMns").value = (temp && temp!= 0) ? temp-1 : 0
                                            }}/>
                                        </div>
                                    }
                                </div>
                                <div className='text-richblack-300'>
                                    MM
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex'>
                                    <input
                                        disabled={view || loading}
                                        id='lectureTimeScs'
                                        placeholder='SS'
                                        {...register("lectureTimeScs")}
                                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full relative'
                                    />
                                    {
                                        !view &&
                                        <div className='absolute text-richblack-300 ml-[170px] flex flex-col mt-3 text-[12px] cursor-pointer'>
                                            <AiOutlineUp onClick={()=>{
                                                let temp = document.getElementById("lectureTimeScs").value ? Number(document.getElementById("lectureTimeScs").value) : 0
                                                document.getElementById("lectureTimeScs").value = temp != 59 ? temp+1 : 0
                                            }}/>
                                            <AiOutlineDown onClick={() => {
                                                let temp = document.getElementById("lectureTimeScs").value ? Number(document.getElementById("lectureTimeScs").value) : 0
                                                document.getElementById("lectureTimeScs").value = (temp && temp!= 0) ? temp-1 : 0
                                            }}/>
                                        </div>
                                    }
                                </div>
                                <div className='text-richblack-300'>
                                    SS
                                </div>
                            </div>
                        </div>
                        {((document.getElementById("lectureTimeHrs") && Number(document.getElementById("lectureTimeHrs").value) == 0) && 
                            (document.getElementById("lectureTimeMns").value && Number(document.getElementById("lectureTimeMns").value) == 0) && 
                            (document.getElementById("lectureTimeScs").value && Number(document.getElementById("lectureTimeScs").value) == 0)) && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture duration is required
                        </span>
                        )}
                    </div>

                    
                    {/* Lecture Description */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm text-richblack-5" htmlFor="lectureTitle">
                            Lecture Description {!view && <sup className="text-pink-200">*</sup>}
                        </label>
                        <input
                            disabled={view || loading}
                            id='lectureDescription'
                            placeholder='Enter Lecture Descriptiom'
                            {...register("lectureDescription", {required: true})}
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                        />
                        {errors.lectureTitle && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture Description is required
                        </span>
                        )}
                    </div>
                    {
                        !view &&
                        <div className="flex justify-end">
                            <IconBtn
                                disabled={loading}
                                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            />
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
