import React from "react";
import { Link } from "react-router-dom";
import { logoTextSrc } from "../../utils/assets";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-top">
        <ul className="col">
              {/* <b>WATCH</b> */}
              
              <li><Link to='/home'>Featured</Link></li>
                <li><Link to='/movies'>Movies</Link></li>
                {/* <li><Link to='/series'>COMMUNITY</Link></li> */}
                <li><Link to='/livetv'>Live TV</Link></li>
                {/* <li><Link to='/livetv'>FEEDBACK</Link></li> */}
                
                <li><Link to='/policy'>Our Policy</Link></li>
             
            </ul>
        <div className="links">
            
            
          </div>
          <div className="left">
            <div className="logo">
              <img
                src={logoTextSrc}
                alt="afriplay-logo"
              />
            </div>
          </div>
          
        </div>
        <div className="date-footer">
          
          <ul></ul>
          <p>&copy;{new Date().getFullYear()} AFRIPLAY ALL RIGHTS RESERVED.</p>
          <ul></ul>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;


{/* <ul>
            <li><Link to='/livetv'>FEEDBACK</Link></li>
            <li><Link to='/#faq'>HELP &amp; FAQ</Link></li>
            <li><Link to='/livetv'>TERMS &amp; CONDITIONS</Link></li>
          </ul> */}

{/* <ul>
            <li><Link to='/'>ABOUT</Link></li>
            <li><Link to='/series'>COMMUNITY</Link></li>
            <li><Link to='/livetv'>POLICY</Link></li>
          </ul> */}

{/* <ul className="col">
              <b>AFRIPLAY</b>
              <ul>
                <li><Link to='/afripremiere'>AFRIPREMIERE</Link></li>
                <li><Link to='/afriplaylive'>AFRILIVE</Link></li>
              </ul>
            </ul> */}
            {/* <ul className="col">
              <b>WATCH</b>
              <ul>
                <li><Link to='/movies'>MOVIES</Link></li>
                <li><Link to='/series'>SERIES</Link></li>
                <li><Link to='/livetv'>LIVE TV</Link></li>
              </ul>
            </ul> */}