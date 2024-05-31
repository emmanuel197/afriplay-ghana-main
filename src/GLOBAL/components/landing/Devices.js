import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Family.scss";
import { androidStore, appleStore } from "../../../utils/assets";

const Devices = () => {
  const navigate = useNavigate();
  const handleWatchNowClick = () => {
    navigate("/signup");
  };
  return (
    <div className="family">
      <div className="container">
        <div className="inside-family">
          <div className="picture">
            <img src='/assets/device-mockup.png' alt="family-afriplay" />
          </div>
          <div className="texts">
            <h1>All Your Devices</h1>
            <p>Stream movies, series, live Channels entertainment, across all your devices from one subscription. From GHC5.</p>
            <div className="store-icons">
              <img src={androidStore} alt='android-store' />
              <img src={appleStore} alt='apple-store' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
