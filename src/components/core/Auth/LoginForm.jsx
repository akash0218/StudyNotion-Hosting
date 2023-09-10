import { ACCOUNT_TYPE } from '../../../utils/Constants'
import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import Tab from '../../Common/Tab'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../../services/operations/authAPIs'

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const onSubmitHandler = (event) => {
        event.preventDefault();
        setFormData({
            emailId: "",
            password: "",
        })
        setShowPassword(false);
        dispatch(signIn(formData.emailId, formData.password, navigate))
    }

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [formData, setFormData] = useState({
        emailId: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div>

            <form className="mt-6 flex w-full flex-col gap-y-4" onSubmit={onSubmitHandler}>
                {/* tab */}
                <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

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
                    <label className='w-full relative'>
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
                            className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400'
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-2 top-[38px] z-[10] cursor-pointer"
                            >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                            
                        </span>
                        <Link to="/forgot-password">
                            <p className="mt-2 ml-auto max-w-max text-xs text-blue-100">
                                Forgot Password
                            </p>
                        </Link>
                    </label>

                </div>

                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Sign In
                </button>

            </form>

        </div>
    )
}

export default LoginForm
