import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { getPasswordResetToken } from '../services/operations/authAPIs';
import { BiArrowBack } from "react-icons/bi"

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth);

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='flex flex-col min-h-[calc(100vh-3.5rem)] justify-center items-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            {
                                !emailSent ? "Reset Your Password" : "Check Your Email"
                            }
                        </h1>

                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            {
                                emailSent ? `We have sent the reset email to ${email}` : 
                                        "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>

                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSent && (
                                    <label className="w-full">
                                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                            Email address <sup className="text-pink-200">*</sup>
                                        </p>
                                        <input 
                                            required
                                            type='email'
                                            name='email'
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            placeholder='Enter Your Email Address'
                                            className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 w-full"
                                        />
                                    </label>
                                )
                            }

                            <button type='submit' className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                {
                                    !emailSent ? "Reset Your Password" : "Resend Email"
                                }
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login" className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack/>
                                <p>Back to login</p>
                            </Link>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
