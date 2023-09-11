import React from 'react'
import { useDispatch } from 'react-redux'
import { setAccountType } from '../../slices/authSlice'

const Tab = ({tabData, field}) => {
    const dispatch = useDispatch()
    return (
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E]'>
            {
                tabData.map(element => {
                    return (
                        <div key={tabData.id} onClick={() => dispatch(setAccountType(element.type))} className={`${element.type == field ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}
                                                                                            py-2 px-5 rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5`}>
                            {element.tabName}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tab
