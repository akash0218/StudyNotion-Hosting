import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAccountType, setTab } from '../../../slices/authSlice';

const Button = (props) => {
    const {linkto, children, color, handleButton} = props;
    const dispatch = useDispatch();
    dispatch(setAccountType("Student"))

    return (
        <div>
            {
                !handleButton &&
                <Link to={linkto}>

                    <button className='transition-all duration-200 hover:scale-95 w-fit' onClick={()=>dispatch(setTab(""))}>

                        <div className={`w-auto h-[48px] rounded-lg py-[12px] px-[20px] ${ color=="yellow" ? `bg-yellow-50 shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] text-richblack-900`: 
                            `bg-richblack-800 text-richblack-5 shadow-[inset_-2px_-2px_0px_0px_#FFFFFF2E]` } font-inter text-[16px] font-bold leading-6 hover:shadow-none`}>
                            {children}
                        </div>

                    </button>

                </Link>
            }
            {
                handleButton &&
                <div onClick={handleButton}>

                    <button className='transition-all duration-200 hover:scale-95 w-fit'>

                        <div className={`w-auto h-[48px] rounded-lg py-[12px] px-[20px] ${ color=="yellow" ? `bg-yellow-50 shadow-[inset_-2px_-2px_0px_0px_#FFFFFF82] text-richblack-900`: 
                            `bg-richblack-800 text-richblack-5 shadow-[inset_-2px_-2px_0px_0px_#FFFFFF2E]` } font-inter text-[16px] font-bold leading-6 hover:shadow-none`}>
                            {children}
                        </div>

                    </button>

                </div>
            }
        </div>
    )
}

export default Button
