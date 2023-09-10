import React from 'react'
import Button from './Button'
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, btn1, btn2, codeblock, gradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-8`}>

        {/* Section-1 */}
        <div className='w-[50%] flex flex-col gap-[12px]'>
            <div className='font-inter font-semibold text-[36px] leading-[44px] tracking-[0.01em] text-richblack-5'>
                {heading}
            </div>
            <div className='text-[16px] leading-6 font-medium text-richblack-300'>
                {subheading}
            </div>
            <div className='flex gap-[24px] mt-7 pt-[35px]'>
                <Button linkto={btn1.linkto} color={btn1.color}>
                    <div className='flex gap-2 items-center'>
                        {btn1.text}
                        <FaArrowRight/>
                    </div>
                </Button>

                <Button linkto={btn2.linkto} color={btn2.color}>
                    <div className='flex gap-2 items-center'>
                        {btn2.text}
                    </div>
                </Button>
            </div>
        </div>

        {/* codeanimation */}
        <div className='forBorder w-[100%] background h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative lg:w-[470px] border-solid border-[1px]'>
            {gradient}
            <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold '>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                <TypeAnimation 
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block",
                        }
                    }
                    omitDeletionAnimation= {true}
                />
            </div>

        </div>

    </div>
  )
}

export default CodeBlocks
