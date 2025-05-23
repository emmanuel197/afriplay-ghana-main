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
import { errorLog } from "../logger";
import { COOKIES } from "../../utils/constants";
import { useHandleNavigation } from "../components/navigationHelpers";
const user_info = COOKIES.get("user_info");

export const navigateHandler = (link) => {
  window.location.href  = link
}
const Header = (prop) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { profile } = useSelector((state) => state.account);
 
  const { showDrawer } = useSelector(state => state.drawer);
  const _toggleDrawer = ( ) => dispatch(toggleDrawer(!showDrawer));
  const handleClick = useHandleNavigation(); // Reuse the navigation logic
  useEffect(() => {
    if (location.pathname === "/search") setShowSearch(true);
  }, [location]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!profile?.first_name) {
          const profileInfo = await getProfile();
          localStorage.setItem("afri_profile", JSON.stringify(profileInfo));
          dispatch(setProfile(profileInfo));
        }
      } catch (e) {
        errorLog("", e);
      }
    };

    fetchProfile();
  }, [dispatch, profile]);

  return (
    <>
      <header className="header">
        <div>
          <div className="header-wrapper">
            <div className="header-left-content">
              <Logo />
              {prop.links > 2 && (
                <nav className="links">
                  {/* <Link to="/home">
                    <p
                      className={
                        location.pathname === "/home" ? "active-link" : ""
                      }
                    >
                      featured
                    </p>
                  </Link> */}
                  <Link 
                  // to="/movies"
                   onClick={() => navigateHandler("/movies")}
                   className="nav-link">
                    <p
                      className={
                        location.pathname === "/movies" ? "active-link" : ""
                      }
                    >
                      movies
                    </p>
                  </Link>
                  {/* <Link to="/series">
                    <p
                      className={
                        location.pathname === "/series" ? "active-link" : ""
                      }
                    >
                      series
                    </p>
                  </Link> */}
                  <Link className="nav-link" to="/livetv">
                    <p
                      className={
                        location.pathname === "/livetv" ? "active-link" : ""
                      }
                    >
                      live TV
                    </p>
                  </Link>
                  {/* <Link className="nav-link" to="/afripremiere">
                    <p
                      className={
                        location.pathname === "/afripremiere"
                          ? "active-link"
                          : ""
                      }
                    >
                      afripremiere
                    </p>
                  </Link> */}
                  {/* <Link className="nav-link" to="/afriplaylive">
                    <p
                      className={
                        location.pathname === "/afriplaylive"
                          ? "active-link"
                          : ""
                      }
                    >
                      live drama
                    </p>
                  </Link> */}
                  <div className="dropdown">
                    <button
                      onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                      className="dropdown-toggler"
                    >
                      access packs
                      {/* <img
                        style={{ width: "20px", height: "20%", filter: "invert(60%)" }}
                        src="/assets/svg/caret-down.svg"
                        alt="chevron icon"
                      /> */}
                    </button>
                    {showAccessDropdown && (
                      <ul
                        className="dropdown-menu"
                        style={{ marginLeft: "2.2rem" }}
                      >
                        <li style={{ margin: "0", padding: "0" }}>
                          <Link style={{ padding: "0" }} to="/subscriptions">
                            <p
                              className={
                                location.pathname === "/subscriptions"
                                  ? "active-link"
                                  : ""
                              }
                            >
                              PACKS
                            </p>
                          </Link>
                        </li>
                        <li style={{ marginTop: "1rem" }}>
                          <Link
                            style={{ padding: "0" }}
                            to="/subscription-history"
                          >
                            <p
                              className={
                                location.pathname === "/subscription-history"
                                  ? "active-link"
                                  : ""
                              }
                            >
                              HISTORY
                            </p>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </nav>
              )}
            </div>

            <div className="right-content">
              <div className="search-wrapper">
                {user_info ? (
                  <div onClick={() => search(dispatch, searchQuery)}>
                    <Link to="/search">
                      {showSearch ? (
                        <input
                          value={searchQuery}
                          onChange={(e) => {
                            let text = e.target.value;
                            setSearchQuery(text);
                            search(dispatch, text);
                          }}
                          autoFocus
                          type="text"
                          placeholder="Search"
                        />
                      ) : null}
                      <img
                        src="/assets/svg/search.svg"
                        className="search-icon"
                        style={showSearch ? { display: "none" } : null}
                        alt="search"
                      />
                    </Link>
                  </div>
                ) : null}
              </div>
              {/* className={`sign-in-up ${!user_info && "not-user-info"}`}  */}
              <div className={`sign-in-up ${user_info && "not-user-info"}`}>
                {!user_info ? (
                  <>
                    <Link to="/signup" className="sign-up">
                      <div>
                        <p className="sign-up-text">SIGN UP</p>
                      </div>
                    </Link>
                    <Link to="/signin" className="sign-in">
                      <div>
                        <p className="sign-in-text">SIGN IN</p>
                      </div>
                    </Link>
                    <div
                      className="access-packs"
                      onClick={() => handleClick("/subscriptions")}
                    >
                      <div>
                        <p>ACCESS PACKS</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className="profile-wrapper"
                    onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                  >
                    <img
                      src="/assets/profile.png"
                      className="profile-icon"
                      alt="profile icon"
                    />
                    <p>{profile?.first_name}</p>
                    <img src="/assets/svg/caret-down.svg" alt="chevron icon" />
                  </div>
                )}
              </div>
              {!showSearch ? (
                <div
                  className={`menu-btn ${user_info && "not-user-info"}`}
                  onClick={() => _toggleDrawer()}
                >
                  <svg
                    clipRule="evenodd"
                    fillRule="evenodd"
                    fill="#fff"
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
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {showAccountDropdown ? (
          <div className="account-dropdown">
            <Button label="Log Out" action={() => logout()} />
            <Link to="/profile">
              <p style={{ color: "#fff", marginTop: "10px" }}>Profile</p>
            </Link>
          </div>
        ) : null}
      </header>
      <Drawer />
    </>
  );
};

const Logo = () => {
  const [homeLink, setHomeLink] = useState("/");

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/select-network" || path === "/signup" || path === "/") {
      setHomeLink("/");
    } else {
      setHomeLink("/home");
    }
  }, []);

  return (
    <div id="logo">
      <Link 
      // to={homeLink}
       onClick={() => navigateHandler("/home")}>
        <img src={logoTextSrc} alt="afriplay-logo" />
      </Link>
    </div>
  );
};

export default Header;
