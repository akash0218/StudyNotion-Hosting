import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, selected, setSelected}) => {

    return (
        <div className={`flex flex-col ${selected === cardData.heading ? "bg-[#FFFFFF] shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} w-[342px] h-[300px] cursor-pointer` } 
            onClick={() => setSelected(cardData?.heading)}>

            <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3'>
                <div className={`font-inter font-600 text-[20px]  ${selected === cardData.heading ? "text-richblack-800" : "text-richblack-25"}`} >
                    {cardData.heading}
                </div>

                <div className={`font-inter font-400 text-[16px] leading-6  ${selected === cardData.heading ? "text-richblack-500" : "text-richblack-400"}`}>
                    {cardData.description}
                </div>
            </div>

            <div className={`flex justify-between ${selected === cardData?.heading ? "text-blue-300" : "text-richblack-300"} px-6 py-3 font-medium`}>
                <div className="flex items-center gap-2 text-[16px]">
                    <HiUsers />
                    <p>{cardData?.level}</p>
                </div>

                <div className="flex items-center gap-2 text-[16px]">
                    <ImTree />
                    <p>{cardData?.lessionNumber} Lession</p>
                </div>
            </div>

        </div>
    )
}

export default CourseCard
