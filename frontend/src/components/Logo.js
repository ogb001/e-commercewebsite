import React from 'react';
import logo from '../asset/logo.jpg'; 

function Logo(w,h) {
  return (
    <div className=''>
      <img src={logo} alt="Logo" style={{ width: '100px ', height: '' }} />
    </div>
  );
}

export default Logo; 