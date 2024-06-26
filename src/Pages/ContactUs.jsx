import React from 'react'
import ContactDetails from '../components/core/ContactPage/ContactDetails'
import ContactForm from '../components/core/ContactPage/ContactForm'
import Footer from '../components/Common/Footer'

const ContactUs = () => {
  return (
    <div>

        <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-7">

            <div className="lg:w-[40%]">
                <ContactDetails />
            </div>

            <div className="lg:w-[60%]">
                <ContactForm/>
            </div>

        </div>

        <Footer />
      
    </div>
  )
}

export default ContactUs
