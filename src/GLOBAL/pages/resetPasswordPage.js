import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDeviceInCookies } from "../constants/setDeviceInCookies";
import { resetPassword, validateUserAccount } from "../redux/auth";
import checkUserAllowed from "../../utils/checkUserAllowed";
import Button from "../components/buttons/Button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../components/styles/auth.scss";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { isValid, loading } = useSelector((state) => state.auth);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //new field for password
  const [rePassword, setRePassword] = useState(""); //confirmation of new password

  // const [useMobileNumber, setuseMobileNumber] = useState(true)
  // const [hasSelectedNetworks, setHasSelectedNetworks] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("afri_selected_operator")) {
      navigate("/reset-password");
    }

    setMobileNumber(localStorage.getItem("afri_mobile_number") || "");
  }, [navigate]);

  //renamed func from _initVerifyMSISDN to _initVerifyUserData
  const _initValidateUserAccount = () => {
    // LoginUnicast(true, mobileNumber, email, password) //renamed func from verifyMSISDN to verifyUserData
    validateUserAccount(true, mobileNumber, email, navigate);
  };
  const _initResetPassword = () => {
    // LoginUnicast(true, mobileNumber, email, password) //renamed func from verifyMSISDN to verifyUserData
    resetPassword(true, mobileNumber, email, password, rePassword, navigate);
  };

  const handleMobileNumberInput = (e) => {
    const text = e.target.value;
    const limit = 10;
    if (isNaN(Number(text))) return;
    setMobileNumber(text.slice(0, limit));
  };

  // functions to set password when user makes input
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleRePasswordInput = (e) => {
    setRePassword(e.target.value);
  };

  // I am setting cookies that ll later check for user browser when user logs in
  // this will help in setting the device info for login post API
  // I will do this for the landing and signup - signin
  // and it ll load when the user visits page or refreshes page with useEffect beneath this
  useEffect(() => {
    setDeviceInCookies();
    checkUserAllowed();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header links={1} signin={5} />
      <main>
        <wc-toast></wc-toast>
        <div className="auth">
          <div className="auth-wrapper">
            <div className="auth-container">
              <div className="form-container">
                {!isValid && (
                  <>
                    <h2>Forgot Password?</h2>
                    <p>Enter your username to reset your password</p>
                    <div>
                      {/* <label>Phone number</label> */}
                      <input
                        placeholder="eg. 0541234567"
                        value={mobileNumber}
                        onChange={handleMobileNumberInput}
                      />
                    </div>
                  </>
                )}
                {isValid && (
                  <>
                    <h2>Enter your new password</h2>
                    <p>{mobileNumber}</p>
                    <div>
                      {/* <label>Password</label> */}
                      <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordInput}
                        minLength="7"
                        required
                      />
                    </div>
                    <div>
                      {/* <label>Confirm Password</label> */}
                      <input
                        placeholder="Confirm Password"
                        type="password"
                        value={rePassword}
                        onChange={handleRePasswordInput}
                        minLength="7"
                        required
                      />
                    </div>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    userSelect: "none"
                  }}
                >
                  <Button
                    style={{ borderRadius: "10px" }}
                    action={isValid ? _initResetPassword : _initValidateUserAccount}
                    isDisabled={loading}
                    label={isValid ? "CONTINUE": "RESET PASSWORD"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
