import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/Constants'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from '../../Common/Tab';
import { toast } from "react-hot-toast"
import { setAccountType, setSignUpData } from "../../../slices/authSlice"
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '../../../services/operations/authAPIs';
import { useNavigate } from 'react-router-dom';
import PasswordCheckList from './PasswordCheckList';

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {accountType} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        }
    ]

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        const signupData = {
            ...formData,
            accountType,
        }
        
        console.log(signupData);

        dispatch(setSignUpData(signupData));
        dispatch(sendOTP(formData.emailId, navigate));

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
            confirmPassword: "",
        })
        dispatch(setAccountType("Student"))

    }

    return (
        <div>
            
            {/* tab */}
            <Tab tabData={tabData} field={accountType}/>

            {/* form */}
            <form onSubmit={submitHandler} className="flex w-[444px] flex-col gap-y-4">

                {/* firstName, lastName */}
                <div className='flex w-full'>
                    <label className='w-[50%] mr-[35px]'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            type="text" 
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleOnChange}
                            placeholder='Enter your First Name'
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                    </label>

                    <label className='w-[50%]'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            type="text" 
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleOnChange}
                            placeholder='Enter your Last Name'
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                    </label>
                </div>

                <div>
                    <label className='w-full'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            type="text" 
                            required
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleOnChange}
                            placeholder='Enter your Email Address'
                            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                    </label>
                </div>

                <div className='flex w-full'>
                    <label className='w-[50%] mr-[35px] relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>

                    <label className='w-[50%] relative'>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </label>
                </div>
                
                <PasswordCheckList password={formData.password} confirmPassword={formData.confirmPassword}/>

                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                    Create Account
                </button>
            </form>

        </div>
    )
}

export default SignUpForm
