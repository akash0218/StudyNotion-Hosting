import React, { useState } from 'react'
import UpdateProfilePicture from './UpdateProfilePicture'
import UpdateProfileInfo from './UpdateProfileInfo'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'
import Modal from '../../../Common/Modal'

const Settings = () => {

    const [modal, setModal] = useState(false);

    return (
        <div>
            <div className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </div>

            {
                modal && <Modal/>
            }

            <UpdateProfilePicture setModal={setModal}/>

            <UpdateProfileInfo/>

            <ChangePassword/>

            <DeleteAccount/>

        </div>
    )
}

export default Settings
