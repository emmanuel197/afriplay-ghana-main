import React from 'react';
import "../components/styles/loader.scss"
import { useState, useEffect } from 'react';
const Spinner = ({title}) => {
  
    return (
      
      <div id="loader-wrapper">
          <h4 id="loader-header">Loading {title ? title: ''} ...</h4>
          <span className="loader"></span>
      </div>
    );
  };
  
  export default Spinner;