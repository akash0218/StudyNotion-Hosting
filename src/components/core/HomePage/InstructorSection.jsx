import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from './HighlightText';
import Instructor from "../../../assets/Images/Instructor.png";
import Button from './Button';

const InstructorSection = () => {
  return (
    <div className='flex px-[120px] py-[90px] gap-[98px] items-center'>
        <div className='shadow-[-20px_-20px_0px_0px_#FFFFFF] w-[50%]'>
            <img src={Instructor}/>
        </div>
        <div className='flex flex-col gap-[12px] w-[50%]'>
            <div className='lg:w-[50%] text-4xl font-semibold text-richblack-5'>
                Become an <HighlightText text={"instructor"}/>
            </div>
            <div className='font-medium text-[16px] text-justify w-[90%] text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>
            <div className='w-fit mt-10'>
                <Button linkto={"/signup"} color={"yellow"}>
                    <div className='flex items-center gap-3'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div>
                </Button>
                
            </div>
        </div>
    </div>
  )
}

export default InstructorSection
