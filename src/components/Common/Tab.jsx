import { element } from 'prop-types'
import React from 'react'

const Tab = ({tabData, field, setField}) => {
    return (
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max shadow-[inset_0px_-1px_0px_0px_#FFFFFF2E]'>
            {
                tabData.map(element => {
                    return (
                        <div key={tabData.id} onClick={() => setField(element.type)} className={`${element.type == field ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"}
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
