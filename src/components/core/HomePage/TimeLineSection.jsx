import React from 'react'

import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
];


const TimeLineSection = () => {
  return (
    <div className='flex lg:flex-row gap-[0px] mb-[60px] mt-[25px] ml-[140px] items-center justify-center w-11/12 max-w-maxContent'>
        <div className='flex flex-col w-[45%] gap-[80px] mb-20'>
            {
                TimeLine.map((element, index) => {
                    return (
                        <div className='flex gap-10' key={index}>

                            <div className={`w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0] z-[10]`}>
                                <img src={element.Logo} alt="" />
                            </div>

                            <div>
                                <div>
                                    <h2 className="font-semibold text-[18px]">{element.Heading}</h2>
                                    <p className="text-base">{element.Description}</p>
                                </div>
                                <div>

                                </div>
                            </div>

                            <div
                                className={`hidden ${
                                    TimeLine.length - 1 === index ? "hidden" : "lg:block"
                                }  h-[60px] border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px] absolute mt-[62px] -z-0`}
                                >
                            </div>

                        </div>
                    )
                })
            }
        </div>

        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
            <div className='flex absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 lg:flex-row flex-col text-white py-5 gap-4 lg:gap-0 lg:py-10'>
                <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>
                    <div className='text-3xl font-bold w-[75px]'>
                        10
                    </div>
                    <div className='flex flex-col text-caribbeangreen-300 text-sm w-[75px]'>
                        <div>
                            YEARS
                        </div>
                        <div>
                            EXPERIENCES
                        </div>
                    </div>

                </div>
                <div className='flex gap-5 items-center  px-7 lg:px-14'>
                    <div className='text-3xl font-bold w-[75px]'>
                        250
                    </div>
                    <div className='flex flex-col text-caribbeangreen-300 text-sm w-[75px]'>
                        <div>
                            TYPES OF
                        </div>
                        <div>
                            COURSES
                        </div>
                    </div>

                </div>
            </div>
            <img
                src={TimeLineImage}
                alt="timelineImage"
                className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-[545px] w-[714px]"
            />
        </div>
    </div>
  )
}

export default TimeLineSection
