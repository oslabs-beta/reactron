import React from 'react';
import Profile from './Profile';
import FileExplorer from './FileExplorer';
import Signout from './Signout';

export default function NavBarContainer(props) {
  return (
    <div className='NavBarContainer'>
      <Profile username={props.username} />
      <Signout />
    </div>
  );
}
