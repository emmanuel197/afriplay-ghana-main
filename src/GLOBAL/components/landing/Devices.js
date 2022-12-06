import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Family.scss";

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
            <p>Get endless entertainment, across all your devices from one subscription.</p>
            <div className="store-icons">
              <img src='/assets/android-store.svg' alt='android-store' />
              <img src='/assets/apple-store-icon.svg' alt='apple-store' />
            </div>
            {/* <h1>
              Get endless <span className="yellow-span"> entertainment </span> 
              <br />
              <span className="yellow-span">live sports </span> and the shows 
              <br /> and
              <span className="yellow-span"> movies </span> you love.
            </h1> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
