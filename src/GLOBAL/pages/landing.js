import React, { useEffect } from "react";
// COMPONENTS
import Banner from "../components/landing/Banner";
import Family from "../components/landing/Family";
import Faq from "../components/landing/Faq";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { setDeviceInCookies } from "../constants/setDeviceInCookies";
import Devices from "../components/landing/Devices";
import Logo from "../components/Logo";
import { sendLog } from "../redux/account";
import DataFriendly from "../components/landing/DataFriendly";

const Landing = () => {
  // I am setting cookies that ll later check for user browser when user logs in
  // this will help in setting the device info for login post API
  // I will do this for the landing and signup - signin
  // and it ll load when the user visits page or refreshes page with useEffect beneath this
  const isAuthenticated = JSON.parse(window.localStorage.getItem('isAuthenticated'))
  
  useEffect(() => {
    const initSendLogs = async () => {
      await sendLog({
        action: 'visit',
        instance: process.env.REACT_APP_DEFAULT_COUNTRY_SYMBOL
      })
    }

    window.scrollTo(0, 0);
    setDeviceInCookies();
    initSendLogs()
  }, []);

  return (
    <>
      <main style={{ background: ' #1a052b' }}>
        <Header links={1} signup={5} />
        <Banner isAuthenticated={isAuthenticated}/>
        <Devices />
        <DataFriendly />
        <Faq />
        <Logo w='200px' />
        <Footer />
      </main>
    </>
  );
};

export default Landing;
