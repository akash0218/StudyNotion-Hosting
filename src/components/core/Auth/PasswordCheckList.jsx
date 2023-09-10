import React, { useEffect } from 'react'
import {HiCheckCircle} from "react-icons/hi"
import {HiMiniXCircle} from "react-icons/hi2"
import { useState } from 'react'
import { VALIDATIONS } from '../../../utils/Constants'

const PasswordCheckList = ({password, confirmPassword}) => {
    const [lowerCase, setLowerCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [number, setNumber] = useState(false);
    const [match, setMatch] = useState(false);
    const [length, setLength] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);

    const {NUMBER, LOWERCASE, UPPERCASE, SPECIALCHARACTER} = VALIDATIONS;

    useEffect(() => {
        setLowerCase(false);
        setLength(false);
        setUpperCase(false);
        setNumber(false);
        setSpecialCharacter(false);
        if(password.length >= 8){
            setLength(true);
        }
        password.split("").map((char, index) => {
            if(LOWERCASE.includes(char)){
                setLowerCase(true);
            }
            else if(UPPERCASE.includes(char)){
                setUpperCase(true);
            }
            else if(SPECIALCHARACTER.includes(char)){
                setSpecialCharacter(true);
            }
            else if(NUMBER.includes(char)){
                setNumber(true);
            }
        })
    }, [password])

    useEffect(() => {
        setMatch(false);
        if(password != "" && password == confirmPassword){
            setMatch(true);
        }
    }, [confirmPassword, password])

    return (
        <div className='grid grid-cols-2 gap-x-1 gap-y-1'>

            <div className={`${match ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        match ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>passwords match</p>
            </div>

            <div className={`${lowerCase ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        lowerCase ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>one lowercase character</p>
            </div>

            <div className={`${specialCharacter ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        specialCharacter ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>one special character</p>
            </div>

            <div className={`${upperCase ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        upperCase ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>one upperCase character</p>
            </div>

            <div className={`${number ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        number ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>one number</p>
            </div>

            <div className={`${length ? 'text-[green]' : 'text-richblack-100'} flex gap-1`}>
                <div className='flex items-center justify-center'>
                    {
                        length ? <HiCheckCircle/> : <HiMiniXCircle/>
                    }
                </div>
                <p>8 characters minimum</p>
            </div>

        </div>
    )
}

export default PasswordCheckList
