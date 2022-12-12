import axios from "axios"
import { COOKIES, EMAIL_REGEXP, ERROR_MESSAGES, TOAST } from "../../utils/constants"
import OPERATORS from "../../utils/operators"
import { generateOTPAPI, loginAPI, signUpAPI, validateOTPAPI } from "../constants/apis"
import { processLog } from "../logger"
import { sendLog } from "./account"

const _verifyMSISDN = (mobileNumber) => {
  console.warn('verifying MSISDN')

  let storedMSISDN = COOKIES.get('afri_msisdn')
  if (!storedMSISDN || storedMSISDN !== mobileNumber) {
    COOKIES.set('afri_msisdn', mobileNumber) // create msisdn with phone number
    return false // return true to test msisdn feature
  }
  return true
}

const _verifyEmail = email => EMAIL_REGEXP.test(email)

const prefixedMobileNumber = mobileNumber => {
  localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.afriplayghana)) //! remove when users are supposed to choose network

  const storedSelectedOperator = JSON.parse(localStorage.getItem("afri_selected_operator"))
  return storedSelectedOperator.username_prefix + mobileNumber
}

export const verifyMSISDN = async (isPhoneNumber, mobileNumber, email, navigate) => {
  const user_info = COOKIES.get("user_info");

  if (!isPhoneNumber) {
    if (_verifyEmail(email)) {
      TOAST.error(ERROR_MESSAGES.AUTH.invalidEmail)
      return
    }
  }

  else {
    if (mobileNumber.length < 10) {
      TOAST.error(ERROR_MESSAGES.AUTH.invalidMobileNumber)
      return
    }
  }

  // verify network before sending OTP
  //TODO: uncomment when going live
  // const storedOperatorInfo = window.localStorage.getItem('afri_selected_operator')
  // const _ouid = JSON.parse(storedOperatorInfo).operator_uid

  // const networkVerificationResponse = await axios.get(
  //   `https://tvanywhereonline.com/cm/api/auth/?operator_uid=${_ouid}&usr=`, {
  //   headers: {
  //     'Password': 'tva12345#',
  //     'Username': 'tva'
  //   }
  // })

  // const networkValid = networkVerificationResponse.data.valid

  // if (networkVerificationResponse.data.status === 'ok') {
  //   if (!networkValid) {
  //     TOAST.error(ERROR_MESSAGES.VERIFICATION.invalidNetwork)
  //     return
  //   }
  // } else {
  //   TOAST.error(ERROR_MESSAGES.errorOccured)
  //   return
  // }

  // on email and mobile number checks passed
  window.localStorage.setItem("afri_email", email)
  window.localStorage.setItem("afri_mobile_number", mobileNumber)
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))


  // msisdn verification failed
  if (!user_info || !_verifyMSISDN(mobileNumber)) {
    /** 
     * signup user
     * login user
     * generate otp
     * verify otp
     * save login info
     * route to home
     */

    console.warn('msisdn verification failed, generating OTP')

    await generateOTP(isPhoneNumber, mobileNumber, email)
    navigate('/otp-verification')
    return
  }

  // msisdn verification passed
  window.location.href = '/home'
}


export const generateOTP = async (isPhoneNumber, mobileNumber, email) => {

  console.warn('mobileNumber', mobileNumber)

  try {
    let res = await axios.post(generateOTPAPI(), {
      mobile_number: mobileNumber
    })

    console.warn('generate OTP', res.data)
  }

  catch (e) {
    console.error(e)
    TOAST.error(ERROR_MESSAGES.errorOccured)
  }
}

export const verifyOTP = async (isPhoneNumber, OTPCode) => {
  if (OTPCode.length < 6) {
    TOAST.error(ERROR_MESSAGES.AUTH.wrongOTP)
    return
  }

  const username = window.localStorage.getItem('afri_username')
  const mobileNumber = window.localStorage.getItem('afri_mobile_number')
  const email = window.localStorage.getItem('afri_email')

  processLog(`number: ${mobileNumber} with OTP: ${OTPCode}`)

  let OTP

  OTP = await axios.post(validateOTPAPI(), {
    mobile_number: mobileNumber,
    otp: OTPCode
  })

  if (OTP.data.status === 'error') {
    console.warn('OTP response error >>', OTP.data)
    TOAST.error(OTP.data.message)
    return
  }

  console.warn('OTP response pass >>', OTP.data)

  if (OTP.data.status === "ok") {

    console.warn('signing up...', mobileNumber, username)

    const signupResponse = await axios.post(signUpAPI(), {
      first_name: "Afri",
      last_name: "Play",
      email: email,
      phone_number: mobileNumber,
      username: username,
    })

    console.warn('signupResponse >>', signupResponse.data)

    if (signupResponse.data.message === "subscriber already exist") {
      LoginUnicast()
      return
    }

    if (
      signupResponse.data.status === "error" &&
      signupResponse.data.message !== "subscriber already exist"
    ) {
      TOAST.error(`Oops! ${signupResponse.data.message}. Try again`)
      return
    }

    if (signupResponse.data.status === "ok") LoginUnicast()
  }
}


const LoginUnicast = async () => {
  const deviceInfoCookie = COOKIES.get("device_info")
  const username = window.localStorage.getItem('afri_username')
  const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  const formattedOperator = username + `@${selectedOperator.operator_uid}`

  console.warn('device', deviceInfoCookie)

  try {
    const loginResponse = await axios.post(loginAPI, {
      username: formattedOperator,
      password: "1234567",
      device: COOKIES.get("device"),
      device_class: deviceInfoCookie.device.type ? deviceInfoCookie.device.type : "Desktop",
      device_type: deviceInfoCookie.device.vendor || "Desktop",
      device_os: "Windows"
    })

    console.warn('login uniqcast response >>', loginResponse.data)

    if (loginResponse.data.status === "ok") {
      console.warn('uniqcast login pass >>', loginResponse.data)
      COOKIES.set("user_info", loginResponse)


      await sendLog({ action: 'login' })
      window.location.href = '/home'
    }
  }

  catch (e) {
    console.warn('login uniqcast error >>', e.message)
  }
}