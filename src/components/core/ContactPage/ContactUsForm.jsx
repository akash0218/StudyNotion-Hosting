import React, { useEffect } from 'react'
import { useState } from 'react';
import {useForm} from "react-hook-form"
import { contactusEndpoint } from '../../../services/apis';
import { apiConnector } from '../../../services/apiconnecter';
import { toast } from 'react-hot-toast';
import { countrycodes } from '../../../data/countrycode';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
                countrycode: "",
            })
        }
    }, [isSubmitSuccessful, reset])

    const submitContactForm = async(data) => {
        console.log("Logging data", data);
        const {firstName ,lastName, message, email} = data
        try{
            setLoading(true);
            console.log("akash")
            const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {firstName, lastName, email, message})
            console.log("logging response", response);
            toast.success("Message Sent Successfully")
        }
        catch(error) {
            console.log(error)
            console.log("Error: ", error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">

            <div className="flex flex-col gap-5 lg:flex-row">
                {/* firstName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='firstName' className='text-[14px] text-richblack-5'>First Name</label>
                    <input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first Name'
                        {...register("firstName", {required: true})}
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    />
                    {
                        errors.firstName && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter First Name
                            </span>
                        )
                    }
                </div>
                
                {/* lastName */}
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor='lastName' className='text-[14px] text-richblack-5'>Last Name</label>
                    <input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        {...register("lastName")}
                        className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    />
                </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-2">
                <label htmlFor='email' className='text-[14px] text-richblack-5'>
                    Email Address
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

            {/* phoneNo */}
            <div className='flex flex-col gap-2'>
                <label htmlFor="phonenumber" className='text-[14px] text-richblack-5'>
                    Phone Number
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[85px] flex-col gap-2">
                        <select name='dropdown' id='dropdown' {...register("countrycode", {required: true})} className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 
                        shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'>
                            {
                                countrycodes.map((element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type='number'
                            name="phonenumber"
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                            {...register("phoneNo", 
                                {
                                    required: {value: true, message: "Please Enter Phone Number"}, 
                                    maxLength: {value:10, message:"Invalid Phone Number"}, 
                                    minLength: {value:10, message:"Invalid Phone Number"}
                                }
                            )}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            {/* message */}
            <div className="flex flex-col gap-2">
                <label htmlFor='message' className='text-[14px] text-richblack-5'>
                    Message
                </label>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your Message Here'
                    {...register("message", {required: true})}
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                />
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your Message
                        </span>
                    )
                }
            </div>
            
            {/* button */}
            <button type='submit' className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                        ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"} disabled:bg-richblack-500 sm:text-[16px] `}>
                Send Message
            </button>

        </form>
    )
}

export default ContactUsForm
