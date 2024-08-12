import { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Watchlist from "../components/profileTabs/Watchlist";
import { fetchUserDevices, getProfile, updateProfile } from "../redux/account";
import "../components/styles/profile.scss"
import Devices from "../components/profileTabs/Devices";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("watchlist");
    const setActiveTabName = (str) => setActiveTab(str);

    return (
        <>
            <div className="body">
                <Header links={5} />
                <main className="account-main">
                    <div className="left-nav">
                        <h3>My Account</h3>
                        <br />
                        <br />
                        <ul>
                            <li className={activeTab === "watchlist" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("watchlist")}>
                                <img src='/assets/profile/watchlist.svg' alt='watchlist_image' />
                                <p>Watchlist</p>
                            </li>
                            {/* <li className={activeTab === "settings" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("settings")}>
                                <img src='/assets/profile/settings.svg' alt='settings_image' />
                                <p>Settings</p>
                            </li> */}
                            <li className={activeTab === "devices" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("devices")}>
                                <img src='/assets/profile/devices.svg' alt='devices_image' />
                                <p>Devices</p>
                            </li>
                            {/* <li className={activeTab === "payment" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("payment")}>
                                <img src='/assets/profile/payment.svg' alt='payment_image' />
                                <p>Payment</p>
                            </li> */}
                            <li className={activeTab === "profiles" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("profiles")}>
                                <img src='/assets/profile/profiles.svg' alt='devices_image' />
                                <p>Profiles</p>
                            </li>
                            <li className={activeTab === "support" ? "active-tab tab" : "tab"} onClick={() => setActiveTabName("support")}>
                                <img src='/assets/profile/support.svg' alt='support_image' />
                                <p>Support</p>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        <Watchlist active={activeTab} />
                        <Settings active={activeTab} />
                        <Devices active={activeTab} />
                        <Payment active={activeTab} />
                        <ProfileCard active={activeTab} />
                        <Support active={activeTab} />
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

const Settings = ({ active }) => {
    if (active === 'settings') return (
        <>Settings</>
    )
    return <></>
}

// const Devices = ({ active }) => {
//     if (active === 'devices') return (
//         <>Devices</>
//     )
//     return <></>
// }

const Payment = ({ active }) => {
    useEffect(() => {
        const initFetchUserDevices = async () => {
            const response = await fetchUserDevices()
            // console.warn('devices', response)
        }
        initFetchUserDevices()
    }, [])


    if (active === 'payment') return (
        <>Payment</>
    )
    return <></>
}

const ProfileCard = ({ active }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [profileInfo, setProfileInfo] = useState({
        'first_name': '',
        'last_name': '',
    })

    useEffect(() => {
        const initGetProfileInfo = async () => {
            let _profileInfo = await getProfile()
            setProfileInfo(await getProfile())
            setFirstName(_profileInfo.first_name)
            setLastName(_profileInfo.last_name)
        }
        initGetProfileInfo()
    }, [])

    if (active === 'profiles') return (
        <div className="profile">
            <div className="profile-image" />
            <div className="flex">
                <b>My profile</b>
                <small>
                    Last Login 01, Oct 2022. 04:00AM
                    <br />
                    Mac OS, Lagos, NG
                </small>
            </div>
            <br />
            <div className="flex">
                <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name" />
                <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name" />
            </div>
            <br />
            <button onClick={() => updateProfile(firstName, lastName)} className="save-btn">Save</button>
        </div>
    )
    return <></>
}

const Support = ({ active }) => {
    if (active === 'support') return (
        <>Support</>
    )
    return <></>
}

export default Profile