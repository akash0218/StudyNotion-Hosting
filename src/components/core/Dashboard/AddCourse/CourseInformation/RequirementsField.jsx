import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const RequirementsField = ({label, name, register, setValue, errors, getValues}) => {

    const [requirement, setRequirement] = useState(null);
    const [requirementList, setRequirementList] = useState([]);
    const {editCourse, course} = useSelector((state) => state.course)

    const handleAddButton = () => {
        if(!requirement){
            toast.error("Please Add Requirements");
        }
        else{
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const changeType = (data) => {
        let temp = data.split(',')
        return temp
    }

    const handleRemoveRequirement = (index) => {
        const updatedList = requirementList.filter((_, i) => index !== i)
        setRequirementList(updatedList);
    }

    useEffect(() => {
        setValue(name, requirementList)
    }, [requirementList])

    useEffect(() => {
        if(editCourse){
            setRequirementList(changeType(course?.instructions[0]))
        }
        register(name, {required: true, validate: (value) => value.length > 0})
    }, [])

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm text-richblack-5">
                {label} <sup className="text-pink-200">*</sup>
            </label>
            <div className="flex flex-col items-start space-y-2">
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e)=>setRequirement(e.target.value)}
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                />
                <button
                    type='button'
                    onClick={handleAddButton}
                    className="font-semibold text-yellow-50"
                >
                    Add
                </button>
            </div>
            {
                requirementList.length > 0 && 
                <ul className="mt-2 list-inside list-disc">
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className="flex items-center text-richblack-5">
                                <span>{requirement}</span>
                                <button
                                    type="button"
                                    className="ml-2 text-xs text-pure-greys-300 "
                                    onClick={() => handleRemoveRequirement(index)}
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            }
            {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                </span>
            )}
        </div>
    )
}

export default RequirementsField
