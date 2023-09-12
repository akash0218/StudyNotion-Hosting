import React from 'react'
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go"
import {useNavigate} from 'react-router-dom'

const Approval = ({request}) => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col min-h-[calc(100vh-3.5rem)] mt-[100px] items-center'>
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                    Awaiting Approval
                </h1>

                <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                    {
                        request ? "We have created your Category request and it is awaiting for the Admin's Approval. We will send a notification as soon as Admin approves / declines your request.": 
                        "We have created your Instructor Account and it is awaiting for the Admin's Approval. We will send a notification as soon as Admin approves / declines your Instructor Account request."
                    }
                </p>

                <button className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900" onClick={() => request ? navigate("/dashboard/my-profile") : navigate("/login")}>
                    {request ? "Back to Dashboard" :"Back to Login"}
                </button>

                <div className="mt-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-x-2 text-richblack-5">
                        <GoHome/>
                        <p>Home</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Approval
