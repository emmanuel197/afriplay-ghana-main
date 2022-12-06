import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoTextSrc } from "../../utils/assets";
import { getProfile, logout } from "../redux/account";
import { setProfile } from "../redux/slice/accountSlice";
import { toggleDrawer } from "../redux/slice/drawerSlice";
import { search } from "../redux/fetchMoviesApi";
import Button from "./buttons/Button";
import Drawer from "./Drawer";
import "./styles/Header.scss";
import { errorLog } from "../logger"
import { COOKIES } from "../../utils/constants";

const user_info = COOKIES.get("user_info");

const Header = (prop) => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const { profile } = useSelector(state => state.account)

  const _toggleDrawer = (state) => dispatch(toggleDrawer(state))

  useEffect(() => {
    if (location.pathname === '/search') setShowSearch(true)
  }, [location])

  // console.log('profile', profile.first_name)

  useEffect(() => {
    const _ = async () => {
      try {
        if (!profile.first_name) {
          const profileInfo = await getProfile()
          localStorage.setItem('afri_profile', JSON.stringify(profileInfo))
          dispatch(setProfile(profileInfo))
        }
      } catch (e) {
        errorLog("", e)
      }
    }

    _()
  }, [dispatch, profile.first_name])

  return (
    <>
      <header className="header">
        <div>
          <div className="header-wrapper">
            <div className="header-left-content">
              <Logo />
              {prop.links > 2 && (
                <nav className="links">
                  <Link to="/home"> <p className={location.pathname === '/home' ? 'active-link' : ''}>FEATURED</p> </Link>
                  <Link to="/movies"> <p className={location.pathname === '/movies' ? 'active-link' : ''}>MOVIES</p> </Link>
                  <Link to="/series"> <p className={location.pathname === '/series' ? 'active-link' : ''}>SERIES</p> </Link>
                  <Link to="/livetv"> <p className={location.pathname === '/livetv' ? 'active-link' : ''}>LIVE TV</p> </Link>
                  <Link to="/afripremiere"> <p className={location.pathname === '/afripremiere' ? 'active-link' : ''}>AFRIPREMIERE</p> </Link>
                  <Link to="/afriplaylive"> <p className={location.pathname === '/afriplaylive' ? 'active-link' : ''}>AFRILIVE</p> </Link>
                </nav>
              )}
            </div>

            <div className="right-content">
              <div className="search-wrapper">
                {user_info ? <div onClick={() => search(dispatch, searchQuery)}>
                  <Link to='/search'>
                    {showSearch ? <input value={searchQuery} onChange={e => {
                      let text = e.target.value;
                      setSearchQuery(e.target.value)
                      search(dispatch, text)
                    }} autoFocus type='text' placeholder="Search" /> : <></>}
                    <img src='/assets/svg/search.svg' className="search-icon" style={showSearch ? { display: 'none' } : null} alt='search' />
                  </Link>
                </div> : <></>}
              </div>

              <div className="sign-in-up">
                {prop.signup > 2 ? (
                  <>
                    <Link to="/select-network" className="sign-up">
                      <div>
                        <img src='/assets/svg/padlock.svg' alt='padlock' />
                        <p>SIGN UP</p>
                      </div>
                    </Link>
                    {/* <Link to="/signin" className="sign-in">SIGN IN</Link> */}
                  </>
                ) : (
                  <div className="profile-wrapper" onClick={() => setShowAccountDropdown(!showAccountDropdown)}>
                    <img src='/assets/profile.png' className="profile-icon" alt='profile icon' />
                    {/* <p>{localStorage.getItem('afri_email') ? localStorage.getItem('afri_email') : localStorage.getItem('afri_username')}</p> */}
                    <p>{profile.first_name}</p>
                    <img src='/assets/svg/caret-down.svg' alt='chevron icon' />
                  </div>
                )}
              </div>
              {!showSearch ? <div className="menu-btn" onClick={() => _toggleDrawer(true)}>
                <svg
                  clipRule="evenodd"
                  fillRule="evenodd"
                  fill="#fff"
                  width={33}
                  height={33}
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
                    fillRule="nonzero"
                  />
                </svg>
              </div> : <></>}
            </div>
          </div>
        </div >
        {showAccountDropdown ? <div className="account-dropdown">
          < Button label='Log Out' action={() => logout()} />
          <Link Link to='/profile' > <p style={{ color: '#fff', marginTop: '10px' }}>Profile</p></Link >
        </div > : <></>}
      </header >
      <Drawer />
    </>
  );
};

const Logo = () => {
  const [homeLink, setHomeLink] = useState("/")

  useEffect(() => {
    if (window.location.pathname === "/select-network" || window.location.pathname === "/signup" || window.location.pathname === "/") setHomeLink("/")
    else setHomeLink("/home")
  }, [])

  return (
    <div className="logo">
      <Link to={homeLink}>
        <img
          src={logoTextSrc}
          alt="afriplay-logo"
        />
      </Link>
    </div>
  )
}

export default Header;