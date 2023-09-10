import React, { useEffect, useRef } from 'react'
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from './CourseSubSectionAccordion'
import { useState } from 'react'


const CourseAccordionBar = ({course, isActive, handleIsActive}) => {

    const ref = useRef(null);
    const [active, setActive] = useState(false);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setActive(isActive?.includes(course._id))
    }, [isActive])

    useEffect(() => {
        setHeight(active ? ref.current.scrollHeight : 0)
    }, [active]);

    return (
        <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
            <div>
                <div
                    className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
                    onClick={()=>{
                        handleIsActive(course._id)
                    }}
                >
                    <div className="flex items-center gap-2">
                        <i
                            className={
                                isActive.includes(course._id) ? "rotate-180" : "rotate-0"
                            }
                        >
                            <AiOutlineDown/>
                        </i>
                        <p>
                            {course?.name}
                        </p>
                    </div>

                    <div>
                        <span className="text-yellow-25">
                            {`${course.SubSection?.length || 0} lecture(s)`}
                        </span>
                    </div>

                </div>
            </div>

            <div
                ref={ref}
                className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
                style={{
                    height: height
                }}
            >
                <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
                    {
                        course?.SubSection?.map((subsection, index) => {
                            return <CourseSubSectionAccordion subsection={subsection} key={index}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default CourseAccordionBar
