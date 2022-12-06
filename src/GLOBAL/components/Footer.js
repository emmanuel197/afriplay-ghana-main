import React from "react";
import { Link } from "react-router-dom";
import { logoTextSrc } from "../../utils/assets";
import "./styles/Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-top">
          <div className="left">
            <div className="logo">
              <img
                src={logoTextSrc}
                alt="afriplay-logo"
              />
            </div>
          </div>
          <div className="links">
            <ul className="col">
              <b>AFRIPLAY</b>
              <ul>
                <li><Link to='/afripremiere'>AFRIPREMIERE</Link></li>
                <li><Link to='/afriplaylive'>AFRILIVE</Link></li>
              </ul>
            </ul>
            <ul className="col">
              <b>WATCH</b>
              <ul>
                <li><Link to='/movies'>MOVIES</Link></li>
                <li><Link to='/series'>SERIES</Link></li>
                <li><Link to='/livetv'>LIVE TV</Link></li>
              </ul>
            </ul>
            <ul className="col">
              {/* <b>WATCH</b> */}
              <ul>
                <li><Link to='/movies'>ABOUT</Link></li>
                <li><Link to='/series'>COMMUNITY</Link></li>
                <li><Link to='/livetv'>POLICY</Link></li>
                <li><Link to='/livetv'>FEEDBACK</Link></li>
                <li><Link to='/livetv'>TERMS</Link></li>
                <li><Link to='/livetv'>FAQs</Link></li>
              </ul>
            </ul>
          </div>
        </div>
        <div className="date-footer">
          {/* <ul>
            <li><Link to='/'>ABOUT</Link></li>
            <li><Link to='/series'>COMMUNITY</Link></li>
            <li><Link to='/livetv'>POLICY</Link></li>
          </ul> */}
          <ul></ul>
          <p>&copy;{new Date().getFullYear()} AFRIPLAY ALL RIGHTS RESERVED.</p>
          <ul></ul>
          {/* <ul>
            <li><Link to='/livetv'>FEEDBACK</Link></li>
            <li><Link to='/#faq'>HELP &amp; FAQ</Link></li>
            <li><Link to='/livetv'>TERMS &amp; CONDITIONS</Link></li>
          </ul> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
