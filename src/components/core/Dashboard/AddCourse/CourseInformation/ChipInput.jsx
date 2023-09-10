import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';

const ChipInput = ({label, name, placeholder, register, errors, setValue, getValues}) => {

    const [chips, setChips] = useState([]);
    const {editCourse, course} = useSelector((state) => state.course)

    const changeType = (data) => {
        let temp = data.split(',')
        return temp
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault()
            const chipValue = event.target.value.trim()

            if (chipValue && chips.includes(chipValue)){
                toast.error("Cannot add existing Tag")
            }

            if (chipValue && !chips.includes(chipValue)){
                const newChips = [...chips, chipValue]
                console.log(newChips)
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    const handleDeleteChip = (chipIndex) => {
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips);
    }

    useEffect(() => {
        setValue(name, chips)
    }, [chips])

    useEffect(() => {
        if(editCourse){
            setChips(changeType(course?.tag[0]))
        }
        register(name, {required: true, validate: (value) => value.length > 0})
    }, [])

    return (
        <div className="flex flex-col space-y-2">
        
            <label htmlFor={name} className="text-sm text-richblack-5" >
                {label} <sup className="text-pink-200">*</sup>
            </label>

            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.map((chip, index) => (
                        <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            {chip}
                            <button
                                type="button"
                                className="ml-2 focus:outline-none"
                                onClick={() => handleDeleteChip(index)}
                            >
                                <MdClose className="text-sm" />
                            </button>
                        </div>
                    ))
                }
                <input
                    id={name}
                    name={name}
                    type='text'
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className='rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full'
                />
                {
                    errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        {label} is required
                    </span>
                    )
                }
            </div>

        </div>
    )
}

export default ChipInput
