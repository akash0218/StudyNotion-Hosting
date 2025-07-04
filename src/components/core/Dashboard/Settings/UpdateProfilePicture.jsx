import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import IconBtn from '../../../Common/IconBtn';
import { FiUpload } from "react-icons/fi"
import { uploadProfilePicture } from '../../../../services/operations/settingsAPIs';
import { useEffect } from 'react';
import { removeProfilePicture } from '../../../../services/operations/settingsAPIs';
import { toast } from 'react-hot-toast';

const UpdateProfilePicture = ({setModal}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    console.log(user)
    const dispatch = useDispatch();
    const ref = useRef(null);

    const [loading, setLoading] = useState(false);
    const [imgFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [cancel, setCancel] = useState(true);

    const handleSelectClick = () => {
        ref.current.click();
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file){
            setImageFile(file);
            previewFile(file);
            setCancel(false)
        }
    }

    const handleFileUpload = () => {
        try{
            console.log("uploading...");
            setLoading(true)
            setModal(true);
            const formData = new FormData();
            formData.append("displayPicture", imgFile);
            dispatch(uploadProfilePicture(token, formData)).then(() => {
                setLoading(false)
                setModal(false)
            })
        }
        catch(error){
            console.log(error.message);
            setLoading(false);
        }
    }

    const handleRemoveClick = () => {
        setModal(true)
        setImageFile(null);
        setPreviewSource(null);
        dispatch(removeProfilePicture(token, user));
        setCancel(true)
        setModal(false);
        toast.success("Profile Picture Removed Successfully.")
    }

    const handleCancelClick = () => {
        document.getElementById("ok").value = "";
        setImageFile(null)
        setPreviewSource(null)
        setCancel(true)
    }

    useEffect(() => {
        if (imgFile) {
          previewFile(imgFile)
        }
      }, [imgFile])

    return (
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">

            <div className="flex items-center gap-x-4">
                <img src={previewSource || user.image} className="aspect-square w-[78px] rounded-full object-cover"/>
                <div className="space-y-2">
                    <p>
                        Change Profile Picture
                    </p>
                    <div className='flex flex-row gap-3'>

                        <input
                            id='ok'
                            type='file'
                            accept='image/png, image/jpeg, image/gif'
                            ref={ref}
                            className='hidden'
                            onChange={handleFileChange}
                        />
                        {
                            cancel ? (
                                <button disabled={loading} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={handleSelectClick}>
                                    Select
                                </button>
                            ) : (
                                <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={handleCancelClick}>
                                    Cancel
                                </button>
                            )
                        }

                        {
                            user.image !== `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}` &&
                            <button className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50" onClick={handleRemoveClick}>
                                Remove
                            </button>
                        }

                        <IconBtn
                            text={loading ? "Uploading..." : "Upload"}
                            onclick={handleFileUpload}
                        >
                            {!loading && <FiUpload/>}
                        </IconBtn>

                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default UpdateProfilePicture
