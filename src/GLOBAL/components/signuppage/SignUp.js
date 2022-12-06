import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { verifyMSISDN } from "../../redux/auth"
import Button from "../buttons/Button"
import "../styles/auth.scss"

const SignUp = ({ text }) => {
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [useMobileNumber, setuseMobileNumber] = useState(true)
  const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

  useEffect(() => {
    setMobileNumber()
  }, [])

  const _initVerifyMSISDN = () => {
    verifyMSISDN(true, mobileNumber, email, navigate)
  }

  const handleMobileNumberInput = e => {
    const text = e.target.value
    const limit = 10;
    if (isNaN(Number(text))) return
    setMobileNumber(text.slice(0, limit));
  }

  return (
    <main>
      <wc-toast></wc-toast>
      <div className="auth">
        <div className="auth-wrapper">
          <div className="auth-container">
            <div className="form-container">
              <h2>{text}</h2>
              <div>
                <label>Phone number</label>
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
  )
}

export default SignUp
