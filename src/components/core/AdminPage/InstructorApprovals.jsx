import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { approveInstructorApprovalRequest, declineInstructorApprovalRequest, getInstructorApprovalRequests } from '../../../services/operations/profileAPIs';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { declineCategoryApprovalRequest, getCategoryApprovalRequests, approveCategoryApprovalRequest } from '../../../services/operations/categoriesAPIs';

const InstructorApprovals = ({category}) => {

    const {token} = useSelector(state => state.auth)
    const [requests, setRequests] = useState([]);

    const [confirmationModal, setConfirmationModal] = useState(null)
    const truncateWords = 15;

    useEffect(() => {
        ;(
            async () => {
                let data;
                if(category){
                    data = await getCategoryApprovalRequests(token);
                }
                else{
                    data = await getInstructorApprovalRequests(token);
                }
                setRequests(data);
            }
        )()
    }, [])

    const handleDeleteRequest = async(emailId, name, categoryName, id) => {
        let response;
        if(category){
            response = await declineCategoryApprovalRequest(emailId, name, categoryName, token)
        }
        else{
            response = await declineInstructorApprovalRequest(emailId, name, token)
        }
        if(response){
            const data = requests.filter((request) => request._id != id)
            setRequests(data)
        }
        setConfirmationModal(null)
    }

    const handleApproveRequest = async(emailId, name, categoryName, id) => {
        let response;
        if(category){
            response = await approveCategoryApprovalRequest(emailId, name, categoryName, token)
        }
        else{
            response = await approveInstructorApprovalRequest(emailId, token)
        }
        if(response){
            const data = requests.filter((request) => request._id != id)
            setRequests(data)
        }
        setConfirmationModal(null)
    }

    return (
        <div>
            <div className="text-3xl text-richblack-50">
                Approvals
            </div>
            {
                !requests.length ? (
                    <div className="grid h-[10vh] w-full place-content-center text-richblack-50">
                        You donot have any requests for approval
                    </div>
                ) : (
                    <div className="my-8 text-richblack-50">
                        {
                            requests ? (
                                <div className="flex rounded-t-lg bg-richblack-500 ">
                                    <p className="w-[40%] px-5 py-3">Category</p>
                                    <p className="w-[30%] px-2 py-3">Instructor</p>
                                    <p className="flex-1 px-[110px] py-3">Action</p>
                                </div>
                            ) : (
                                <div className="flex rounded-t-lg bg-richblack-500 ">
                                    <p className="w-[40%] px-5 py-3">Name</p>
                                    <p className="w-[30%] px-2 py-3">Email</p>
                                    <p className="flex-1 px-[110px] py-3">Action</p>
                                </div>
                            )
                        }
                        {
                            requests.map((account, i) => (
                                <div className={`flex items-center border border-richblack-700 ${
                                        i === requests.length - 1 ? "rounded-b-lg" : "rounded-none"
                                    }`}
                                    key={i}>

                                    {
                                        category ? (<div className="flex flex-col w-[45%] cursor-pointer px-5 py-3">
                                            <p>
                                                {account.name}
                                            </p>
                                            <p className='text-richblack-500'>
                                                {account?.description.split(" ").length > truncateWords ? `${account?.description.split(" ").slice(0, truncateWords).join(" ")} ...`: account?.description }
                                            </p>
                                        </div>) : (
                                            <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                                                <img src={account.image} className="h-14 w-14 rounded-lg object-cover"/>
                                                <div className="flex max-w-xs flex-col gap-2">
                                                    <p className="font-semibold">{account.firstName}</p>
                                                    <p className="text-xs text-richblack-300">{account.lastName}</p>
                                                </div>
                                            </div>)
                                    }

                                    {
                                        category ? (<div className='flex flex-col items-center -ml-[115px] mr-[80px]'>
                                            <p>
                                                {account.firstName} {account.lastName}
                                            </p>
                                            <p>
                                                {account.emailID}
                                            </p>
                                        </div>) : (
                                            <div className="w-1/4 -ml-[85px] py-3 mr-8">
                                                {account.emailID}
                                            </div>
                                        )
                                    }

                                    <div className='px-[110px] ml-[5px] -mr-[100px] flex gap-2 mt-1'>
                                        <button className='px-3 py-3 bg-[#65a30d] rounded-md' onClick={()=>setConfirmationModal({
                                            text1: `Accept ${account.firstName} ${account.lastName}'s request?`,
                                            text2: "Request will be Accepted",
                                            bt1Text: "Accept",
                                            btn2Txt: "Cancel",
                                            btn1Handler: () => handleApproveRequest(account.emailID, account.firstName, account.name, account._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                        })}>
                                            <p className='text-richblack-900'>Approve</p>
                                        </button>

                                        <button className='px-3 py-3 bg-[#e11d48] rounded-md' onClick={()=>setConfirmationModal({
                                            text1: `Decline ${account.firstName} ${account.lastName}'s request?`,
                                            text2: "Request will be declined",
                                            bt1Text: "Decline",
                                            btn2Txt: "Cancel",
                                            btn1Handler: () => handleDeleteRequest(account.emailID, account.firstName, account.name, account._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                        })}>
                                            Decline
                                        </button>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                confirmationModal &&
                <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default InstructorApprovals
