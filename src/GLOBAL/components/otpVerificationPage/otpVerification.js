import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// OTP Input
import OtpInput from "react-otp-input"
// React Router
import { useNavigate } from "react-router-dom"
// CSS
import { verifyOTP, verifyResetOTP } from "../../redux/auth"
// import functions from redux API
// import { verifyOTP } from "../../redux/loginApi"
import "../styles/OTPVerification.scss"
// password from state
import { useLocation } from 'react-router-dom';
const OTPVerificationComponent = () => {
  const { loading } = useSelector((state) => state.auth)
  const [otp, setOtp] = useState("")
  const location = useLocation();
  const mobileNumber = localStorage.getItem("afri_mobile_number")
  const navigate = useNavigate()
  //gets password from navigate function after redirection
  const { password } = location.state; 
  // Verifies OTP GENERATION
  const initVerifyOTP = () => !password ?  verifyResetOTP(mobileNumber, otp, navigate) :  verifyOTP(true, otp, password)
  
  return (
    <div className="signup">
      <wc-toast></wc-toast>
      <div className="container">
        <div className="inside-signup">
          <p> {mobileNumber} </p> <br />
          <h2> Enter Verification Code </h2>
          <div className="otp">
            <OtpInput
              value={otp}
              onChange={e => setOtp(e)}
              numInputs={6}
              separator={<span> - </span>}
            />
            <button onClick={() => initVerifyOTP()}>Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerificationComponent
