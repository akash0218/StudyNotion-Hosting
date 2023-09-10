import React from 'react'
import SignUpForm from "./SignUpForm"
import LoginForm from './LoginForm'
import frameImg from "../../../assets/Images/frame.png"

const Template = ({title, description1, description2, image, formType}) => {
    return (
        <div className='flex items-center justify-center gap-52 mx-auto min-h-[calc(100vh-3.5rem)]'>

            <div className="flex flex-col p-[32px]">
                <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <div className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        {title}
                    </div>
                    <div className="mt-4 text-[1.125rem] leading-[1.625rem] flex flex-col">
                        <span className="text-richblack-100">{description1}</span>{" "}
                        <span className="font-edu-sa font-bold text-blue-100">
                            {description2}
                        </span>
                    </div>
                    {
                        formType == "login" ? <LoginForm/> : <SignUpForm/>
                    }
                </div>
            </div>

            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                <img
                    src={frameImg}
                    alt="Pattern"
                    width={558}
                    height={504}
                    loading="lazy"
                />
                <img
                    src={image}
                    alt="Students"
                    width={558}
                    height={504}
                    loading="lazy"
                    className="absolute -top-4 right-4 z-10"
                />
          </div>

        </div>
    )
}

export default Template
