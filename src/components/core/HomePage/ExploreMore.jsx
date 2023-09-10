import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
import Tab from '../../Common/Tab';

const tabsName = [
    {
        id: 1,
        type: "Free",
        tabName: "Free",
    },
    {
        id: 2,
        type: "New to Coding",
        tabName: "New to Coding",
    },
    {
        id: 3,
        type: "Most Popular",
        tabName: "Most Popular",
    },
    {
        id: 4,
        type: "Skills Paths",
        tabName: "Skills Paths",
    },
    {
        id: 5,
        type: "Career Paths",
        tabName: "Career Paths",
    }
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0].type);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [selected, setSelected] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag == value);
        setCourses(result[0].courses);
        setSelected(result[0].courses[0].heading);
    }

    return (
        <div >
            <div className="text-4xl font-semibold text-center my-10">
                Unlock the <span><HighlightText text={"Power of Code"}/></span>
                <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
                    Learn to Build Anything You Can Imagine
                </p>
            </div>

            <Tab tabData={tabsName} field={currentTab} setField={setMyCards}/>

            <div className='lg: h-[200px]'></div>

            {/* course card ka group */}
            <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">

                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard key={index} cardData = {element} selected= {selected} setSelected={setSelected}/>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ExploreMore
