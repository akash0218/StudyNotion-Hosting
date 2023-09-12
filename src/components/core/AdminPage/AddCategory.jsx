import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from "react-icons/fa"
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5"
import IconBtn from '../../Common/IconBtn';
import { useSelector } from 'react-redux';
import { createCategory, createCategoryRequest } from '../../../services/operations/categoriesAPIs';
import toast from 'react-hot-toast';

const AddCategory = ({request}) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors}
      } = useForm();

    const {user} = useSelector(state => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate();

    console.log(user)
    
    const submitHandler = async(data) => {
        let response;
        if(request){
            response = await createCategoryRequest(data.categoryName, data.description, token, user.firstName, user.lastName, user.emailID)
            navigate("/dashboard/request-category/pendingApproval")
        }
        else{
            response = await createCategory(data.categoryName, data.description, token)
        }
        if(response){
            toast.success("Category Created Successfully..!!")
        }
        setValue("description", "")
        setValue("categoryName", "")
    }

    return (
        <div>
            <div className='flex flex-col flex-1 gap-10'>
                <Link to="/dashboard/my-profile" className='text-richblack-300 flex gap-2'>
                    <IoIosArrowBack className='mt-1'/>
                    Back to Dashboard
                </Link>
                <div className='flex flex-col items-center justify-center gap-2'>
                    <button className='grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] border-yellow-50 bg-yellow-50 text-yellow-50'>
                        <FaCheck className="font-bold text-richblack-900" />
                    </button>
                    <div className='text-sm text-richblack-5 flex min-w-[130px] flex-col items-center gap-y-2'>
                        {request ? "Request Category" : "Add Category"}
                    </div>
                </div>
                <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
                    <p className="text-2xl font-semibold text-richblack-5">
                        {request ? "Request Category" : "Add Category"}
                    </p>
                    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(submitHandler)}>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor='categoryName' className="text-sm text-richblack-5" >
                                Category Name <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                id='categoryName'
                                placeholder='Add a Category'
                                {...register("categoryName", {required: true})}
                                className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                            />
                            {errors.sectionName && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Category name is required
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor='description' className="text-sm text-richblack-5" >
                                Description <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                id='description'
                                placeholder='Add description to the Category'
                                {...register("description", {required: true})}
                                className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                            />
                            {errors.sectionName && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Category description is required
                                </span>
                            )}
                        </div>

                        <div className="flex items-end gap-x-4">
                            <IconBtn
                                text={request ? "Request Category" : "Create Category"}
                                outline="true"
                            >
                                <IoAddCircleOutline size={20} className="text-yellow-50" />
                            </IconBtn>
                        </div>
                    </form>
                </div>
            </div>

            
        </div>
    )
}

export default AddCategory
