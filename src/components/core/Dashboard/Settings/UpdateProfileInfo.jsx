import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../Common/IconBtn'
import { updateProfile } from '../../../../services/operations/settingsAPIs'

const UpdateProfileInfo = () => {
    const genders = ["Select Your Gender", "Male", "Female", "Non-Binary", "Prefer not to say", "Other"]
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
      register, 
      handleSubmit, 
      formState:{errors}
    } = useForm();

    const submitHandler = (data) => {
        dispatch(updateProfile(token, user, data, navigate))
    }

    return (
      <form onSubmit={handleSubmit(submitHandler)}>
          <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="text-lg font-semibold text-richblack-5">
              Profile Information
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="firstName" className='text-[14px] text-richblack-5'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter first Name'
                    {...register("firstName")}
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                  />
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="lastName" className='text-[14px] text-richblack-5'>
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter last Name'
                    {...register("lastName")}
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                  />
                </div>

            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor="DateOfBirth" className='text-[14px] text-richblack-5'> Date Of Birth </label>
                  <input
                    type='date'
                    name='DateOfBirth'
                    id="dateOfBirth"
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register("DateOfBirth", {
                      max: {
                          value: new Date().toISOString().split("T")[0],
                          message: "Date of Birth cannot be in the future.",
                        }
                    })}
                    defaultValue={user?.additionalDetails?.dateOfBirth}
                  />
                    {errors.DateOfBirth && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.DateOfBirth.message}
                        </span>
              )}
                </div>

                <div className="flex flex-col gap-2 lg:w-[48%]">
                  <label htmlFor='gender' className='text-[14px] text-richblack-5'>
                      Gender
                  </label>
                  <select
                    type="text"
                    name="gender"
                    id="gender"
                    className='rounded-lg bg-richblack-700 p-[14px] text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                    {...register("gender")}
                    defaultValue={user?.additionalDetails?.gender}
                  >
                    {
                      genders.map((element, index) => {
                        return (
                          <option key={index} value={element}>
                              {element}
                          </option>
                        )
                      })
                    }
                  </select>
                </div>
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='contactNumber' className='text-[14px] text-richblack-5'>
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  placeholder="Enter Contact Number"
                  className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                  {...register("contactNumber", {
                    maxLength: { value: 10, message: "Invalid Contact Number, Should be 10-digits" },
                    minLength: { value: 10, message: "Invalid Contact Number, Should be 10-digits" },
                  })}
                  defaultValue={user?.additionalDetails?.contactNumber}
                />
                  {errors.contactNumber && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                      {errors.contactNumber.message}
                    </span>
                  )}
              </div>

              <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='about' className='text-[14px] text-richblack-5'>
                  About
                </label>
                <input
                  type="text"
                  name="about"
                  id="about"
                  placeholder="Enter Bio"
                  className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none'
                  {...register("about")}
                  defaultValue={user?.additionalDetails?.about}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button onClick={() => navigate("/dashboard/my-profile")} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50">
                  Cancel
            </button>

            <IconBtn text="Save" type="submit"/>
          </div>
      </form>
    )
}

export default UpdateProfileInfo
