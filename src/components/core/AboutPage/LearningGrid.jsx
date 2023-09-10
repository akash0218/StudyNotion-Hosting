import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import Button from '../HomePage/Button';


const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highliteText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];


const LearningGrid = () => {
  return (
    <div className='grid grid-cols-4 mx-auto w-[fit] mb-12'>
        {
            LearningGridArray.map((element, index) => {
                return (
                    <div key={index}
                    className={`${index == 0 && "xl:col-span-2 xl:h-[294px]"} ${element.order % 2 == 1 ? "bg-richblack-700 h-[294px]" : element.order % 2 === 0 ? "bg-richblack-800 h-[294px]" :
                    "bg-transparent"} ${element.order === 3 && "xl:col-start-2"}`}
                    >
                        {
                            element.order < 0 ? (
                                <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">

                                    <div className="text-4xl font-semibold ">
                                        {element.heading}
                                        <br/>
                                        <HighlightText text={element.highliteText}/>
                                    </div>

                                    <div className="text-richblack-300 font-medium">
                                        {element.description}
                                    </div>
                                    
                                    <div className="w-fit mt-2">
                                        <Button linkto={element.BtnLink} color={"yellow"}>
                                            Learn More
                                        </Button>
                                    </div>
                                    

                                </div>
                            ) : (
                                <div className="p-8 flex flex-col gap-8">
                                    <div className="text-richblack-5 text-lg">
                                        {element.heading}
                                    </div>

                                    <div className="text-richblack-300 font-medium">
                                        {element.description}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid
