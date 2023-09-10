import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import HighlightText from '../HomePage/HighlightText';


const Quote = () => {
  return (
    <div className='relative'>
        <FaQuoteLeft className='absolute left-[68px] top-3 text-[#424854]'/>
        <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white relative">
            We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/>, 
            <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold"> expertise</span>, and community to create an 
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold"> unparalleled educational experience.</span>
        </div>
        <FaQuoteRight className='absolute text-[#424854] bottom-[102px] right-[205px]'/>
    </div>
  )
}

export default Quote
