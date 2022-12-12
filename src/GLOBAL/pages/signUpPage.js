import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setDeviceInCookies } from "../constants/setDeviceInCookies"
import { verifyMSISDN } from "../redux/auth"
import checkUserAllowed from "../../utils/checkUserAllowed"
import Button from "../components/buttons/Button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import '../components/styles/auth.scss'

const SignUpPage = () => {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  // const [useMobileNumber, setuseMobileNumber] = useState(true)
  // const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('afri_selected_operator')) {
      navigate('/signup')
    }

    setMobileNumber(localStorage.getItem('afri_mobile_number') || '')
  }, [navigate])

  const _initVerifyMSISDN = () => {
    verifyMSISDN(true, mobileNumber, email, navigate)
  }

  const handleMobileNumberInput = e => {
    const text = e.target.value
    const limit = 10
    if (isNaN(Number(text))) return
    setMobileNumber(text.slice(0, limit))
  }

  // I am setting cookies that ll later check for user browser when user logs in
  // this will help in setting the device info for login post API
  // I will do this for the landing and signup - signin
  // and it ll load when the user visits page or refreshes page with useEffect beneath this
  useEffect(() => {
    setDeviceInCookies()
    checkUserAllowed()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header links={1} signup={5} />
      <main>
        <wc-toast></wc-toast>
        <div className="auth">
          <div className="auth-wrapper">
            <div className="auth-container">
              <div className="form-container">
                <h2>Enter your phone number</h2>
                <div>
                  {/* <label>Phone number</label> */}
                  <input
                    placeholder="eg. 0541234567"
                    value={mobileNumber}
                    onChange={handleMobileNumberInput}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}>
                  <Button action={_initVerifyMSISDN} isDisabled={loading} label='Continue' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SignUpPage
