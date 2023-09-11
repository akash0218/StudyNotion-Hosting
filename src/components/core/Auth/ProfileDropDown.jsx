import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import { AiOutlineCaretDown } from "react-icons/ai"
import { useState } from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { Toast, toast } from 'react-hot-toast';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPIs';
import { setTab } from '../../../slices/authSlice';



const ProfileDropDown = ({setCurrentTab}) => {

    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    useOnClickOutside(ref, setOpen);

    return (
        <button className='relative z-[10]' onClick={()=>setOpen(true)}>

            <div className="flex items-center gap-x-1">

                <img src={user?.image} alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[30px] rounded-full object-cover"/>
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
                
            </div>

            {
                open && 
                <div className='relative'>
                    <div className={`${open ? "absolute left-[40%] top-[5px] h-4 w-4 rotate-45 rounded bg-richblack-800 border-[1px] border-richblack-700 translate-y-[-45%] translate-x-[92%] z-[1010]" : ""}`}/>
                    <div className="absolute top-[5px] -left-[55px] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 z-[1040]"
                    onClick={(e) => e.stopPropagation()} ref={ref}>
                        <Link to="/dashboard/my-profile" onClick={() => {
                            setOpen(false)
                            dispatch(setTab(""))
                        }}>
                            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <VscDashboard className="text-lg" />
                                Dashboard
                            </div>
                        </Link>

                        <Link to="/" onClick={() => {
                            setOpen(false)
                            dispatch(logout(navigate))
                        }}>
                            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <VscSignOut className="text-lg" />
                                logout
                            </div>
                        </Link>
                    </div>
                </div>
            }

        </button>
    )
}

export default ProfileDropDown