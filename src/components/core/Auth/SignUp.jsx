import React from 'react'
import Template from './Template'
import signUpImg from "../../../assets/Images/signup.webp"
import { useSelector } from 'react-redux'

const SignUp = () => {
  const {loading} = useSelector((state) => state.auth);
  return (
      <div className='flex items-center justify-center mx-auto'>
        {
          loading ? (
            <div className="spinner mt-[350px]"></div>
          ) : (
            <div>
                <Template 
                    title="Join the millions learning to code with StudyNotion for free"
                    description1="Build skills for today, tomorrow, and beyond."
                    description2="Education to future-proof your career."
                    image={signUpImg}
                    formType="signup"
                />
            </div>
          )
        }
      </div>
  )
}

export default SignUp
