import React from "react";
import { useNavigate } from "react-router-dom";

// CSS
import "../styles/Family.scss";

// assets
import FamilyPic from "../../../assets/family.png";
import Play from "../../../assets/play.png";

const Family = () => {
  const navigate = useNavigate();
  const handleWatchNowClick = () => {
    navigate("/signup");
  };
  return (
    <div className="family">
      <div className="container">
        <div className="inside-family">
          <div className="picture">
            <img src={FamilyPic} alt="family-afriplay" />
          </div>
          <div className="texts">
            <h1>
              Get endless <span className="yellow-span"> entertainment </span> 
              <br />
              <span className="yellow-span">live sports </span> and the shows 
              <br /> and
              <span className="yellow-span"> movies </span> you love.
            </h1>
            <div className="play" onClick={handleWatchNowClick}>
              {/* <p> */} <img src={Play} alt="play" /> Watch Now
              {/* </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Family;
