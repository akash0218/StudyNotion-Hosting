import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";

import HighlightText from '../components/core/HomePage/HighlightText';
import Button from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from "../components/Common/Footer";
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/Common/ReviewSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType, setTab, setToken } from '../slices/authSlice';
import { setUser } from '../slices/profileSlice';

const Home = () => {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const user = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const type = user.user && user.user.accountType;

    const handleButton = () => {
        dispatch(setTab(""))
        if(token && type === "Instructor"){
            navigate("/dashboard/my-profile")
        }
        else if(!token){
            dispatch(setAccountType("Instructor"))
            navigate("/signup")
        }
        else{
            navigate("/signup")
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(setAccountType("Instructor"))
            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }

    return (
        <div>
        
            {/* Section-1 */}
            <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
        text-white justify-between'>

                {/* become an instructor button */}
                <div>

                    <div className='group mt-16 p-1 mx-auto bg-richblack-800 rounded-full transition-all duration-200 hover:scale-95 w-fit shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E] hover:shadow-none'>
                    
                        <div className='flex items-center gap-[10px] py-[5px] cursor-pointer px-10 group-hover:bg-richblack-900 transition-all duration-200 rounded-full' onClick={handleButton}>
                            <p className='text-richblack-200'>Become an instructor</p>
                            <FaArrowRight className='w-[12px] h-[12px] text-richblack-200'/>
                        </div>

                    </div>

                </div>

                {/* Description Section */}
                <div className='flex flex-col font-inter gap-4 mt-10 w-[913px]'>
                    
                    <div className='font-semibold text-[36px] leading-2.75rem text-center'>
                        <p> Empower Your Future with <HighlightText text={"Coding Skills"}/> </p>
                    </div>

                    <div>
                        <p className='text-center text-[16px] leading-6 font-medium text-richblack-300'> With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.  </p>
                    </div>

                    <div className='flex mx-auto gap-[24px] mt-10'>

                        <Button color={"yellow"} linkto={token ? "/dashboard/my-profile" : "/signup"}>
                            Learn More
                        </Button>
                        
                        <Button color={"black"} linkto={token ? "/dashboard/my-profile" : "/login"}>
                            Book a Demo
                        </Button>

                    </div>

                </div>

                {/* video */}
                <div className="mx-3 my-16 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video muted loop autoPlay className='shadow-[20px_20px_0px_0px_#F5F5F5]'>
                        <source src={Banner} type='video/mp4'></source>
                    </video>
                </div>

                {/* code section-1 */}
                <div>

                    <CodeBlocks position={"lg:flex-row"} 
                        heading={
                            <div>
                                Unlock your <HighlightText text={"coding potential"}/> with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        btn1={
                            {
                                text: "Try it Yourself",
                                color: "yellow",
                                linkto: `${token ? "/dashboard/my-profile" : "/signup"}`
                            }
                        }
                        btn2={
                            {
                                text: "Learn More",
                                color: "black",
                                linkto: `${token ? "/dashboard/my-profile" : "/login"}`,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        codeColor={"text-yellow-25"}
                        gradient={<div className='absolute codeBlock-1'></div>}
                    />

                </div>

                <div>

                    <CodeBlocks position={"lg:flex-row-reverse"} 
                        heading={
                            <div>
                                Start <HighlightText text={"coding in"}/> <br/> <HighlightText text={"seconds"}/>
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        btn1={
                            {
                                text: "Continue Lesson",
                                color: "yellow",
                                linkto: `${token ? "/dashboard/my-profile" : "/login"}`
                            }
                        }
                        btn2={
                            {
                                text: "Learn More",
                                color: "black",
                                linkto: `${token ? "/dashboard/my-profile" : "/signup"}`,
                            }
                        }
                        codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        codeColor={"text-white"}
                        gradient={<div className='absolute codeBlock-2'></div>}
                    />

                </div>

                <ExploreMore/>

            </div>

            {/* Section-2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                
                <div className='homepage_bg h-[310px]'>
                    <div className='w-11/12 max-2-maxContent flex items-center gap-5 mx-auto justify-center'>
                        <div className='h-[450px]'></div>
                        <div className='flex gap-7 text-white'>
                            <Button linkto={`${token ? "/dashboard/my-profile" : "/login"}`} color={"yellow"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </Button>

                            <Button linkto={`${token ? "/dashboard/my-profile" : "/login"}`} color={"black"}>
                                Learn More
                            </Button>
                            
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center bg-pure-greys-5 gap-8'>
                    
                    <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                        
                        <div className='text-richblack-900 font-inter font-semibold text-4xl leading-[44px] tracking-tighter w-[40%]'>
                            Get the Skills you need for a <span><HighlightText text={"job that is in demand."}/></span>
                        </div>

                        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
                            <p className='font-inter font-800 text-[16px] leading-[24px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>
                            <Button color={"yellow"} linkto={`${token ? "/dashboard/my-profile" : "/login"}`}>
                                Learn More
                            </Button>
                        </div>

                    </div>

                </div>

                <TimeLineSection/>

                <LearningLanguageSection/>

            </div>

            {/* Section-3 */}
            <div className='w-11/12 max-w-maxContent mx-auto items-center justify-betweem gap-8 bg-richblack-900 tet-white'>

                {/* section-1 */}
                <InstructorSection handleButton={handleButton}/>

                {/* section-2 */}
                <h2 className="text-center text-4xl font-semibold mb-2 text-richblack-5">Reviews from Other Learners</h2>

                <ReviewSlider/>
            </div>

            {/* Section-4 */}
            <div>
                <Footer/>
            </div>

        </div>
  )
}

export default Home

