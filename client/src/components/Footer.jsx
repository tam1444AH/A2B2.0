import React from 'react';
import { IoAirplaneSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div 
      className="d-flex justify-content-between align-items-center p-3 fw-medium w-100" 
      style={{
        backgroundColor: '#1a1a1a', // A lighter shade compared to Homepage's black
        color: 'white'
      }}
    >
      <div className="fs-2">
        A<IoAirplaneSharp />B
      </div>
      <div className="fs-2 fst-italic">
        V2.0
      </div>
    </div>
  );
};

export default Footer;
