import React from 'react';
import Profile from './Profile';
import FileExplorer from './FileExplorer';
import Signout from './Signout';

export default function NavBarContainer(props) {
  return (
    <div className='NavBarContainer'>
      <Profile username={props.username} />
      <FileExplorer
        files={props.files}
        username={props.username}
        project={props.project}
      />
      <Signout />
    </div>
  );
}
