import React from 'react';
import { FaCartFlatbed, FaCartFlatbedSuitcase } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Floating = () => {
  return (
    <div className="floating-icon">
       
      <a href='/cart'><FaCartFlatbedSuitcase className='floating-io'/></a>
    </div> 
  );
};

export default Floating;