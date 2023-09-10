import React from 'react'

const IconBtn = ({text, onclick, children, outline=false, customClasses, type}) => {
    console.log()
    return (
            <button onClick={onclick} type={type} className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 ${customClasses}`}>
                {
                    children ? (
                            <>
                                {
                                    text == "New" && 
                                    children
                                } 
                                <span className={`${outline && "text-yellow-50"}`}>
                                    {text}
                                </span>
                                {
                                    text != "New" &&
                                    children
                                }
                            </>
                    ) : (
                        text
                    )
                }
            </button>
    )
}

export default IconBtn
