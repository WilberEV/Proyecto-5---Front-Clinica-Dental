import React from 'react'
import './SignUp.css'
import { userSignUp } from '../../services/apiCalls'

export const SignUp = () => {
  return (
    <div className='signUpBody'>
      <div className="signUpButton" onClick={() => userSignUp()}>
            Login
          </div>
    </div>
  )
}
