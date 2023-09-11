import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPIs'
import { useDispatch, useSelector } from 'react-redux'
import SideBarLink from './SideBarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../Common/ConfirmationModal'
import { ACCOUNT_TYPE } from '../../../utils/Constants'

const SideBar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);

    const [confirmModal, setConfirmModal] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return (
            <div className='spinner mt-10'/>
        )
    }

    return (
        <div>

            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">

                <div className='flex flex-col'>

                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) {
                                return null
                            }
                            if(link.type == ACCOUNT_TYPE.INSTRUCTOR && link.name == "Dashboard"){
                                return (
                                    <div className='flex flex-col'>
                                        <SideBarLink link={link} iconName={link.icon} key={link.id}/>
                                        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'/>
                                        <p className='text-richblack-50 ml-8'>Instructor</p>
                                    </div>
                                )
                            }
                            return (
                                <SideBarLink link={link} iconName={link.icon} key={link.id}/>
                            )
                        })
                    }

                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'/>

                <div className='flex flex-col'>
                    <SideBarLink link={{name: "Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear"/>

                    <button onClick={() => setConfirmModal(
                        {text1: "Are You Sure ?",
                        text2: "You will be logged out of your Account",
                        bt1Text: "Logout",
                        btn2Txt: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmModal(null),
                        }
                    )}
                    className='text-sm font-medium text-richblack-300 px-8 py-2'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>

                    </button>
                </div>

                {
                    confirmModal && <ConfirmationModal modalData={confirmModal}/>
                }
            </div>
        
        </div>
    )
}

export default SideBar
