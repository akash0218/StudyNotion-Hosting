import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import IconBtn from '../../Common/IconBtn';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getInstructorCourseDetails } from '../../../services/operations/courseAPIs';
import { useDispatch, useSelector } from 'react-redux';
import CoursesTable from './CoursesTable';
import { setStep, setCourse, setEditCourse } from '../../../slices/courseSlice';

const MyCourses = () => {
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const [courses, setCourses] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    const fetchCourses = async () => {
        setLoading(true)
        let result = await getInstructorCourseDetails(token);
        if(result){
            setCourses(result)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    if(loading){
        return (
            <div className="flex h-screen items-center justify-center">
              <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            <div className='flex justify-between mb-10'>
                <div className='flex flex-col gap-3'>
                    <div className='flex gap-2'>
                        <Link to="/" className='text-richblack-300'>Home</Link>
                        <p className='text-richblack-300'>/</p>
                        <Link to="/dashboard/my-profile" className='text-richblack-300'>Dashboard</Link>
                        <p className='text-richblack-300'>/</p>
                        <Link to="/dashboard/my-courses" className='text-yellow-50'>Courses</Link>
                    </div>
                    <div className="text-3xl font-medium text-richblack-5">
                        My Courses
                    </div>
                </div>
                <IconBtn text="New" customClasses={"h-[48px] w-[109px]"} onclick={()=>{
                    navigate("/dashboard/add-course");
                    dispatch(setStep(1))
                    dispatch(setCourse(null))
                    dispatch(setEditCourse(false))
                }}>
                    <AiOutlinePlusCircle/>  
                </IconBtn>
            </div>
            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }
        </div>
    )
}

export default MyCourses
