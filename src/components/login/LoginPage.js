import React from 'react';
import Login from './Login';
import Logo from './Logo';
import Demo from './Demo';
// import BackToSplash from './BackToSplash';
import LoginContainer from './LoginContainer';
// import NavBarContainer from '../NavBar/NavBarContainer'

export default function LoginPage(props) {
  return (
    <div className='LoginPageWrapper'>
      <div className='LoginPage'>
        <LoginContainer />
        <Logo />
        <Login />
        <Demo useUsername={props.useUsername} useFilesArr={props.useFilesArr} />
        {/* <BackToSplash /> */}
        {/* <NavBarContainer /> */}
      </div>
    </div>
  );
}
