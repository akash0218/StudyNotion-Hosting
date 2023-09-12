import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'
import { adminSignIn } from '../../../services/operations/authAPIs'
import { useDispatch } from 'react-redux'

const Admin = () => {
    const dispatch = useDispatch()
    const {
        register, 
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm()

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                password: ""
            })
        }
    }, [isSubmitSuccessful, reset])

    const [password, showPassword] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        dispatch(adminSignIn(data.email, data.password, navigate))
    }

    return (
        <div className='w-5/12 max-w-maxContent mx-auto mt-[200px]'>
            <div className='border border-richblack-600 rounded-md flex flex-col ml-5 items-center justify-center'>
                <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E]'>
                    <div className='bg-richblack-600 text-richblack-5 py-2 px-5 rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5'>
                        Admin
                    </div>
                </div>

                <form className='flex flex-col gap-8' onSubmit={handleSubmit(submitHandler)}>
                    <div className="flex flex-col gap-2 w-[500px]">
                        <label htmlFor='email' className='text-[14px] text-richblack-5'>
                            Email Address <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter email Address'
                            {...register("email", {required: true})}
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        {
                            errors.email && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter your email Address
                                </span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2 w-[500px] relative">
                        <label htmlFor='password' className='text-[14px] text-richblack-5'>
                            Password <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            type= {`${password ? "text" : "password"}`}
                            name='email'
                            id='email'
                            placeholder='Enter Password'
                            {...register("password", {required: true})}
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                        />
                        <span
                            onClick={() => showPassword((prev) => !prev)}
                            className="absolute right-3 top-[42px] z-[10] cursor-pointer"
                            >
                            {password ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            
                        </span>
                        {
                            errors.email && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please Enter your password
                                </span>
                            )
                        }
                    </div>

                    <button type='submit' className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                         disabled:bg-richblack-500 sm:text-[16px] mb-10`}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Admin
