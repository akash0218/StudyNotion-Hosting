import React from 'react'
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../Common/IconBtn';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../services/operations/settingsAPIs';

const ChangePassword = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(changePassword(user.emailID, password, newPassword, token, navigate));
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <div className="text-lg font-semibold text-richblack-5">
            Password
          </div>

          <div className='flex justify-between'>

            <div className='relative flex flex-col gap-2 w-[48%]'>
              <label htmlFor='password' className='text-[14px] text-richblack-5'>
                Current Password
              </label>
              <input
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              placeholder='Enter Current Password'
              className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
              />
              <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[39px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
            </div>

            <div className='relative flex flex-col gap-2 w-[48%]'>
              <label htmlFor='password' className='text-[14px] text-richblack-5'>
                New Password
              </label>
              <input
              type={showNewPassword ? "text" : "password"}
              onChange={handleNewPasswordChange}
              placeholder='Enter Current Password'
              className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
              />
              <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[39px] z-[10] cursor-pointer"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-2">
            <button onClick={() => navigate("/dashboard/my-profile")} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                  Cancel
            </button>

            <IconBtn text="Update" type="submit"/>
          </div>
      </form>
    )
}

export default ChangePassword
