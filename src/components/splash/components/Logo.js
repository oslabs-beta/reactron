import React from 'react';
import logo from '../../../../assets/logo.png';

console.log('logo');

export default function Logo() {
  return (
    <div className='logo'>
      <div className='logoWrapper'>
        <img id='logo' src={logo} alt={'Logo'} />
      </div>
    </div>
  );
}
