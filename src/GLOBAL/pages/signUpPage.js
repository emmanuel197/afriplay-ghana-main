import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setDeviceInCookies } from "../constants/setDeviceInCookies"
import { verifyUserData } from "../redux/auth"
import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import checkUserAllowed from "../../utils/checkUserAllowed"
import Button from "../components/buttons/Button"
import Footer from "../components/Footer"
import Header from "../components/Header"
import '../components/styles/auth.scss'
import { COOKIES } from "../../utils/constants"
const SignUpPage = () => {
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState(''); //new field for password
  const [rePassword, setRePassword] = useState(''); //confirmation of new password
  const user_info = COOKIES.get("user_info");
  // const [useMobileNumber, setuseMobileNumber] = useState(true)
  // const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    
    
      // Redirect to home if authenticated
      user_info && navigate('/');
    
 }, [user_info]) 
  useEffect(() => {
    if (!localStorage.getItem('afri_selected_operator')) {
      navigate('/signup')
    }

    setMobileNumber(localStorage.getItem('afri_mobile_number') || '')
  }, [navigate])

  //renamed func from _initVerifyMSISDN to _initVerifyUserData
  const _initVerifyUserData = () => {
    verifyUserData(true, mobileNumber, email, password, rePassword, navigate) //renamed func from verifyMSISDN to verifyUserData
  }

  const handleMobileNumberInput = e => {
    const text = e.target.value
    const limit = 10
    if (isNaN(Number(text))) return
    setMobileNumber(text.slice(0, limit))
  }

  // functions to set password when user makes input
  const handlePasswordInput = e => {
    setPassword(e.target.value);
  }

  const handleRePasswordInput = e => {
    setRePassword(e.target.value);
  };


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
        {isLoading && <Spinner />}
        <div className="auth">
          <div className="auth-wrapper">
            <div className="auth-container">
              <div className="form-container">
                <h2>Sign Up</h2>
                <div>
                  {/* <label>Phone number</label> */}
                  <input
                    placeholder="eg. 0541234567"
                    value={mobileNumber}
                    onChange={handleMobileNumberInput}
                  />
                </div>
                <div>
                  {/* <label>Password</label> */}
                  <input
                    placeholder="Password"
                    type='password'
                    value={password}
                    onChange={handlePasswordInput}
                    minLength='7'
                    required
                  />
                </div>
                <div>
                  {/* <label>Confirm Password</label> */}
                  <input
                    placeholder="Confirm Password"
                    type='password'
                    value={rePassword}
                    onChange={handleRePasswordInput}
                    minLength='7'
                    required
                  />
                </div>
                <div className="margin-bottom">
                  <small >
                    Already have an account? {" "}
                    <Link className="sign-up-link" to='/signin'>Sign in</Link>
                  </small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}>
                  <Button action={_initVerifyUserData} isDisabled={isLoading} label='Continue' />
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
