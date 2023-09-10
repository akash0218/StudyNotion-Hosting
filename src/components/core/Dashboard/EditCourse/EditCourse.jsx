import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { getCourseDetails } from '../../../../services/operations/courseAPIs';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import RenderSteps from '../AddCourse/RenderSteps';

const EditCourse = () => {

    const {courseId} = useParams();
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course)

    console.log(course)
    
    const fetchDetails = async () => {
        setLoading(true)
        const result = await getCourseDetails(courseId)
        if(result){
            dispatch(setStep(1))
            dispatch(setEditCourse(true))
            dispatch(setCourse(result))
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchDetails();
    }, [])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }
    
    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
            </h1>
            <div className="mx-auto max-w-[600px]">
                {
                    course ? (
                        <RenderSteps/>
                    ) : (
                        <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                            Course not found
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default EditCourse
