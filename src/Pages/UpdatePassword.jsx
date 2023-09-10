import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPIs';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import PasswordCheckList from '../components/core/Auth/PasswordCheckList';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate()

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

    return (
        <div className='min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center'>
            {
                loading ? (
                    <div className='spinner'></div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                            Choose  new password
                        </h1>

                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            Almost done. Enter your new password and youre all set.
                        </p>

                        <form onSubmit={handleOnSubmit}> 

                            <label className="relative">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">New Password <sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 w-full pr-10"
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] z-[10] cursor-pointer text-white">
                                    {
                                        showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                    }
                                </span>
                            </label>

                            <label className="relative mt-3 block">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm Password <sup className="text-pink-200">*</sup></p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5 w-full pr-10 mb-5"
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-[38px] z-[10] cursor-pointer text-white">
                                    {
                                        showConfirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                    }
                                </span>
                            </label>

                            <PasswordCheckList password={password} confirmPassword={confirmPassword}/>
                            
                            <button type='submit' className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                            </button>

                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <Link to="/login" className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack />
                                <p>Back to login</p>
                            </Link>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
