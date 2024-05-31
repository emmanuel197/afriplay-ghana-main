import axios from "axios"
import { COOKIES, EMAIL_REGEXP, ERROR_MESSAGES, TOAST } from "../../utils/constants"
import OPERATORS from "../../utils/operators"
import { generateOTPAPI, loginAPI, signUpAPI, validateOTPAPI, fetchUserAPI } from "../constants/apis"
import { processLog } from "../logger"
import { sendLog } from "./account" 
import { isAuthenticatedReducer, isLoadingReducer, isValidReducer } from "./slice/authSlice"
import { store } from "../../GLOBAL/redux/store";


//renamed func from _verifyMSISDN to verifyUserData
const _verifyMSISDN = (mobileNumber, password, rePassword) => {
  console.warn('verifying MSISDN') // renamed from MSISDN to UserData
  
  let storedMSISDN = COOKIES.get('afri_msisdn')

  if (!storedMSISDN || storedMSISDN !== mobileNumber) {
    COOKIES.set('afri_msisdn', mobileNumber) // create msisdn with phone number
    return false // return true to test msisdn feature
  }

  return true // Return the validation status after evaluating all conditionals
}

const _verifyEmail = email => EMAIL_REGEXP.test(email)

const prefixedMobileNumber = mobileNumber => {
  localStorage.setItem('afri_selected_operator', JSON.stringify(OPERATORS.afriplaymtnghana)) //! remove when users are supposed to choose network
  
  const storedSelectedOperator = JSON.parse(localStorage.getItem("afri_selected_operator"))
  return storedSelectedOperator.username_prefix + mobileNumber
}

// Function to validate email, mobile number, and password
const validateUserData = (isPhoneNumber, mobileNumber, email, password, rePassword) => {
  if (!isPhoneNumber) {
    if (_verifyEmail(email)) {
      TOAST.error(ERROR_MESSAGES.AUTH.invalidEmail);
      return false;
    }
  } else if (mobileNumber && mobileNumber.length < 10) {
    TOAST.error(ERROR_MESSAGES.AUTH.invalidMobileNumber);
    return false;
  } else {
    // Password validation
    if (password && password.length < 7) {
      TOAST.error(ERROR_MESSAGES.AUTH.invalidPassword);
      return false;
     } else if (rePassword && password !== rePassword) {
      TOAST.error(ERROR_MESSAGES.AUTH.passwordMismatch);
      return false;
     }
  }
  return true; // Return true if all validations pass
};

//renamed func from verifyMSISDN to verifyUserData
export const verifyUserData = async (isPhoneNumber, mobileNumber, email, password, rePassword, navigate) => {
  const user_info = COOKIES.get("user_info");

  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password, rePassword)) {
    return; // Exit function if validation fails
  }


  // on email and mobile number checks passed
  window.localStorage.setItem("afri_email", email)
  window.localStorage.setItem("afri_mobile_number", mobileNumber)
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))
  
   // verify network before sending OTP
  // TODO: uncomment when going live
  // const storedOperatorInfo = window.localStorage.getItem('afri_selected_operator')
  // const _ouid = JSON.parse(storedOperatorInfo).operator_uid
  // const username = window.localStorage.getItem('afri_username')
  // const networkVerificationResponse = await axios.get(
  //     `https://tvanywhereonline.com/cm/api/auth/?operator_uid=${_ouid}&usr=${username}`, {
  //     headers: {
  //       'Password': 'tva12345#',
  //       'Username': 'tva'
  //     }
  //   })

  //   const networkValid = networkVerificationResponse.data.valid

  //   if (networkVerificationResponse.data.status === 'ok') {
  //     if (!networkValid) {
  //       TOAST.error(ERROR_MESSAGES.VERIFICATION.invalidNetwork)
  //       return
  //     }
  //   } else {
  //     TOAST.error(ERROR_MESSAGES.errorOccured)
  //     return
  //   }
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
    navigate('/otp-verification', { state: { password } })
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

export const verifyOTP = async (isPhoneNumber, OTPCode, password) => {
  // if (OTPCode.length < 6) {
  //   TOAST.error(ERROR_MESSAGES.AUTH.wrongOTP)
  //   return
  // }

  const username = window.localStorage.getItem('afri_username')
  const mobileNumber = window.localStorage.getItem('afri_mobile_number')
  const email = window.localStorage.getItem('afri_email')

  processLog(`number: ${mobileNumber} with OTP: ${OTPCode}`)

  // OTP = await axios.post(validateOTPAPI(), {
  //   mobile_number: mobileNumber,
  //   otp: OTPCode
  // })
  const OTP = await validateOTP(mobileNumber, OTPCode);

  if (OTP.status === 'error') {
    console.warn('OTP response error >>', OTP.data)
    TOAST.error(OTP.data.message)
    return
  }

  console.warn('OTP response pass >>', OTP.data)

  if (OTP.status === "ok") {

    console.warn('signing up...', mobileNumber, username)
    store.dispatch(isLoadingReducer(true))
    const signupResponse = await axios.post(signUpAPI(), {
      first_name: "Afri",
      last_name: "Play",
      email: email,
      phone_number: mobileNumber,
      password: password,
      username: username,
    })

    console.warn('signupResponse >>', signupResponse.data)

    if (signupResponse.data.message === "subscriber already exist") {
      LoginUnicast(true, mobileNumber, email, password)
      return
    }

    if (
      signupResponse.data.status === "error" &&
      signupResponse.data.message !== "subscriber already exist"
    ) {
      store.dispatch(isLoadingReducer(false))
      TOAST.error(`Oops! ${signupResponse.data.message}. Try again`)
      return
    }

    if (signupResponse.data.status === "ok") LoginUnicast(true, mobileNumber, email, password)
  }
}

// Function to validate OTP
const validateOTP = async (mobileNumber, OTPCode) => {
  
  try {
    if (OTPCode.length < 6) {
      TOAST.error(ERROR_MESSAGES.AUTH.wrongOTP)
      return
    }

    const OTP = await axios.post(validateOTPAPI(), {
      mobile_number: mobileNumber,
      otp: OTPCode
    });
    return OTP.data;
  } catch (error) {
    console.error('Error occurred during OTP validation:', error);
    throw error;
  }
}

export const LoginUnicast = async (isPhoneNumber, mobileNumber, email, password) => {
  store.dispatch(isLoadingReducer(true))
  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password)) {
    return; // Exit function if validation fails
  }
  const deviceInfoCookie = COOKIES.get("device_info")
  
  // Set username if not already present in local storage
  
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))
  
  const username = window.localStorage.getItem('afri_username')
  const selectedOperator = JSON.parse(window.localStorage.getItem('afri_selected_operator'))
  const formattedOperator = username + `@${selectedOperator.operator_uid}`
  
  console.warn('device', deviceInfoCookie)
  
  try {
    const loginResponse = await axios.post(loginAPI, {
      username: formattedOperator,
      password: password,
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
      store.dispatch(isAuthenticatedReducer(true))
      store.dispatch(isLoadingReducer(false))
      window.location.href = '/home'
    }
 }

   catch (e) {
    store.dispatch(isLoadingReducer(false))
    TOAST.error(ERROR_MESSAGES.AUTH.invalidLogin)
    console.warn('login uniqcast error >>', e.message)
  }
}

const fetchUserAccount  = async (isPhoneNumber, mobileNumber, email, navigate) => {
  window.localStorage.setItem("afri_username", prefixedMobileNumber(mobileNumber))

  const subscriber_uid = window.localStorage.getItem("afri_username")
  const selectedOperator = JSON.parse(window.localStorage.getItem("afri_selected_operator"))
  const operator_uid = selectedOperator.operator_uid
  
  try {
    const fetchUserAccountRes = await axios.get(fetchUserAPI(), {
    params: {
      operator_uid: operator_uid,
      subscriber_uid: subscriber_uid
    }
    });
    console.log(`user account: ${fetchUserAccountRes.data.data}`)
    if (fetchUserAccountRes.data.status === "ok") {
      if (fetchUserAccountRes.data.data.length === 0) {
        TOAST.error(`${ERROR_MESSAGES.AUTH.invalidAccount}`)
      } else {
        await generateOTP(isPhoneNumber, mobileNumber, email)
        navigate('/otp-verification', { state: {  } })
       
      }
    }
} catch (e) {
    console.warn('fetch user account error >>', e.message)
  }
  
}

export const validateUserAccount = async (isPhoneNumber, mobileNumber, email, navigate) => {
   // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email)) {
    return; // Exit function if validation fails
  }

  fetchUserAccount(isPhoneNumber, mobileNumber, email, navigate)
  
}

export const verifyResetOTP = async (mobileNumber, OTPCode, navigate) => {
  const OTP = await validateOTP(mobileNumber, OTPCode);

  if (OTP.status === 'error') {
    console.warn('OTP response error >>', OTP.data)
    TOAST.error(OTP.data.message)
    return
  }

  console.warn('OTP response pass >>', OTP.data)

  if (OTP.status === "ok") {
    store.dispatch(isValidReducer(true))
    navigate('/reset-password')
  }
}


export const resetPassword = async (isPhoneNumber, mobileNumber, email, password, rePassword, navigate) => {
  // Validate user data
  if (!validateUserData(isPhoneNumber, mobileNumber, email, password, rePassword)) {
    return; // Exit function if validation fails
  }

  const subscriber_uid = window.localStorage.getItem("afri_username")
  const selectedOperator = JSON.parse(window.localStorage.getItem("afri_selected_operator"))
  const operator_uid = selectedOperator.operator_uid
  const url = `https://tvanywhereonline.com/cm/api/subscriber/?operator_uid=${operator_uid}&subscriber_uid=${subscriber_uid}`
  try {
    const resetPasswordRes = await axios.put(url, {
      "password": password
    }
    );

    if (resetPasswordRes.data.message === "subscriber account updated") {
      navigate("/signin")
      
    }

  } catch (e) {
    console.warn('fetch user account error >>', e.message)
  }

}

