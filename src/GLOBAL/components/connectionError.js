// src/components/ConnectionError.jsx
import React from "react";
import "../components/styles/connectionError.scss";
// import errorIcon from '../assets/svg/error-icon.svg'; // Ensure you have the error icon in this path
import { brokenCable } from "../../utils/assets";
import Button from "./buttons/Button";
import { redirect, useLocation } from "react-router-dom";
const ConnectionError = ({ onReload }) => {
  const location = useLocation();
  const redirect = () => {
    window.location.href = location.pathname;
  };
  return (
    <div className="connection-error">
      <img
        src={brokenCable}
        alt="Connection Error Icon"
        className="error-icon"
      />
      <p className="error-text">Connection Error</p>
      <div className="error-button-wrapper"><Button action={() => redirect()} label="Tap to Reload" /></div>
        
    </div>
  );
};

export default ConnectionError;
