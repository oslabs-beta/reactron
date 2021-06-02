import React from 'react';
import Profile from './Profile';
import FileExplorer from './FileExplorer';
import Signout from './Signout';
import PreviousFiles from './PreviousFiles';

export default function NavBarContainer(props) {
  return (
    <div className='NavBarContainer'>
      <Profile username={props.username} />
      <PreviousFiles
        username={props.username}
        useProjName={props.useProjName}
        useFilesArr={props.useFilesArr}
        useLoadStatus={props.useLoadStatus}
      />
      <Signout />
    </div>
  );
}
