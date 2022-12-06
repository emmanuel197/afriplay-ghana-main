import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// OTP Input
import OtpInput from "react-otp-input"
// React Router
import { useNavigate } from "react-router-dom"
// CSS
import { verifyOTP } from "../../redux/auth"
// import functions from redux API
// import { verifyOTP } from "../../redux/loginApi"
import "../styles/OTPVerification.scss"

const OTPVerificationComponent = () => {
  const { loading } = useSelector((state) => state.auth)
  const [otp, setOtp] = useState("")

  // Verifies OTP GENERATION
  const initVerifyOTP = () => verifyOTP(true, otp)

  return (
    <div className="signup">
      <wc-toast></wc-toast>
      <div className="container">
        <div className="inside-signup">
          <p> {localStorage.getItem("afri_mobile_number")} </p> <br />
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
