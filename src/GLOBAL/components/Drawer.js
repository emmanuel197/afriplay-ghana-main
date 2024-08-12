import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { COOKIES } from "../../utils/constants";
import { logout } from "../redux/account";
import { toggleDrawer } from '../redux/slice/drawerSlice';
import Button from "./buttons/Button";
import './styles/Drawer.scss';

const Drawer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { showDrawer } = useSelector(state => state.drawer);
    const _hideDrawer = (state) => dispatch(toggleDrawer(state));
    const user_info = COOKIES.get("user_info");

    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    useEffect(() => {
        console.warn('location changed!');
        _hideDrawer();
    }, [location]);

    if (showDrawer) return (
        <>
            <section className="drawer">
                <div className="drawer-wrapper">
                    <span className='close-btn' onClick={() => _hideDrawer(false)}>&times;</span>

                    {user_info ? (
                        <ul>
                            <li><Link to='/home'>Featured</Link></li>
                            <li><Link to='/movies'>Movies</Link></li>
                            <li><Link to='/series'>Series</Link></li>
                            <li><Link to='/livetv'>Live TV</Link></li>
                            <li><Link to='/afripremiere'>AfriPremiere</Link></li>
                            <li><Link to='/afriplaylive'>Live Drama</Link></li>
                            <li>
                                <button onClick={toggleDropdown} className='dropdown-toggler' style={{background: 'transparent', color: 'white'}}>
                                    Access Packs
                                </button>
                                {showDropdown && (
                                    <ul className='dropdown-menu'>
                                        <li><Link style={{marginLeft: '1rem'}} to='/subscriptions'>Packs</Link></li>
                                        <li><Link style={{marginLeft: '1rem'}} to='/subscription-history'>History</Link></li>
                                    </ul>
                                )}
                            </li>
                            <li><Link to='/profile'>Profile</Link></li>
                            <button onClick={logout} className='btn-filled'>Logout</button>
                        </ul>
                    ) : <></>}

                    {!user_info ? (
                        <div className='drawer-content'>
                            <Link to='/signup'>
                                <button className='btn-filled'>Sign Up</button>
                            </Link>
                            <Link to='/signin'>
                                <button className='btn-ghost'>Sign In</button>
                            </Link>
                        </div>
                    ) : <></>}
                </div>
            </section>
        </>
    );

    return <></>;
};

export default Drawer;
