import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { ACCOUNT_TYPE } from '../../utils/Constants'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { useEffect } from 'react'
import { BsChevronDown } from "react-icons/bs"
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { useRef } from 'react'
import { getAllCategories } from '../../services/operations/courseAPIs'
import { setAccountType, setTab } from '../../slices/authSlice'

const NavBar = () => {

    const {token, tab} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const ref = useRef(null);
    // API CALL
    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await getAllCategories()
            setSubLinks(result)
        }
        catch(error){
            console.error("Could not fetch the category list")
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    const handleFlag = () => {
        setLinkHandler(false)
        setOpen(!open);
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLinkHandler(false)
        }, 2000)
    })

    useOnClickOutside(ref, setOpen)

    const [linkHandler, setLinkHandler] = useState(false);

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

                {/* image */}
                <Link to="/">
                    <img src={logo} width={160} height={32} loading='lazy' onClick={()=>dispatch(setTab("Home"))}/>
                </Link>

                {/* Nav links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>

                        {
                            NavbarLinks.map((element, index) => {
                                return (
                                    <li key={index} className='relative'>
                                        {
                                          element.title !== "Catalog" ? 
                                            (<Link to={element.path} onClick={() => dispatch(setTab(element.title))}>
                                                    <p className={`${tab === element.title ? "text-yellow-25" : "text-richblack-5"}`}>
                                                        {element.title}
                                                    </p>
                                            </Link>)  :
                                            (
                                                <div className='flex items-center justify-center gap-2 group cursor-pointer' ref={ref}>
                                                   <div className='flex items-center justify-center gap-2'>
                                                        <p onClick={handleFlag} className={`${tab === element.title ? "text-yellow-25" : "text-richblack-5"}`}>{element.title}</p>
                                                        <BsChevronDown onClick={handleFlag}/>
                                                   </div>


                                                    <div className={`${(linkHandler && !open) ? "invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150" :`${open ? "absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 transition-all duration-150 translate-y-[1.65em] opacity-100 lg:w-[300px]" : 
                                                    "invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"} `}`}
                                                    >   
                                                        <div className={`${open ? "absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-45%] translate-x-[92%]" : 
                                                        "absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-y-[-45%] translate-x-[92%] invisible group-hover:visible"}`} />
                                                        
                                                        <div className='flex'>
                                                            {
                                                                subLinks.length > 0 ? (<div>
                                                                    {
                                                                        subLinks.map((subLink, index) => {
                                                                            return (
                                                                                <div className='flex' key={index}>
                                                                                    <Link onClick={()=>{
                                                                                        setLinkHandler(true)
                                                                                        setOpen(false)
                                                                                        dispatch(setTab(element.title))
                                                                                    }} to={`/catalog/${subLink.name
                                                                                                                .split(" ")
                                                                                                                .join("-")
                                                                                                                .toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 w-[270px]">
                                                                                        <p>
                                                                                            {subLink.name}
                                                                                        </p>
                                                                                    </Link>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>) : (<div><p className="text-center">No Courses Found</p></div>)
                                                            }
                                                        </div>
                                                        
                                                    </div>

                                                </div>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    
                    </ul>
                </nav>
                
                {/* login, logout, signup, dashboard */}
                <div className='flex gap-x-4 items-center relative'>

                    {
                        token == null && 
                        <Link to={"/login"} className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                            <button onClick={()=>{
                                dispatch(setTab(""))
                                dispatch(setAccountType("Student"))    
                            }}>
                                Log in
                            </button>
                        </Link>
                    }

                    {
                        token == null && 
                        <Link to={"/signup"} className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                            <button onClick={()=>{
                                dispatch(setTab(""))
                                dispatch(setAccountType("Student"))    
                            }}>
                                Sign up
                            </button>
                        </Link>
                    }

                    {
                        token != null &&
                        <div className='flex gap-2'>
                            <div onClick={()=>dispatch(setTab(""))}>
                                {
                                    user && user?.accountType != ACCOUNT_TYPE.INSTRUCTOR && (
                                        <Link to="/dashboard/cart" className='absolute -left-10'>
                                            <AiOutlineShoppingCart className='text-richblack-50 h-[30px] w-[30px]'/>
                                            {
                                                totalItems > 0 &&
                                                <span className="absolute -top-[7px] -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                                    {totalItems}
                                                </span>
                                            }
                                        </Link>
                                    )
                                }
                            </div>
                            <ProfileDropDown/>
                        </div>
                    }

                </div>

            </div>

        </div>
    )
}

export default NavBar
