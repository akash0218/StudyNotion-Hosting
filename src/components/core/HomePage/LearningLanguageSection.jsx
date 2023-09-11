import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import Button from './Button';
import { useSelector } from 'react-redux';


const LearningLanguageSection = () => {
    const {token} = useSelector(state => state.auth)
    return (
        <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto mt-[100px]'>
            <div className='h-[50]'/>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss knife for <span><HighlightText text={"learning any language"}/></span>
            </div>
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom schedule
                and more.
            </div>
            <div className='flex items-center mt-5 ml-10'>

                <img src={know_your_progress} alt="KnowYourProgressImage" className='object-contain -mr-32'/>
                <img src={Compare_with_others} alt="KnowYourProgressImage" className='object-contain' />
                <img src={Plan_your_lessons} alt="PlanYourLessonsImage" className='object-contain -ml-36' />

            </div>

            <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-3">
                <Button linkto={`${token ? "/dashboard/my-profile" : "/signup"}`} color={"yellow"} className="mb-10">
                    Learn More
                </Button>
            </div>

        </div>
    )
}

export default LearningLanguageSection
