import React, { useState } from 'react';
import Header from './Header.jsx';
import NavBarContainerRendered from './NavBar/NavBarContainerRendered';
import DashBoard from './DashBoard';

// Page that will show once directory has been imported
export default function RenderedPage(props) {
  const [refresh, setRefresh] = useState(0);

  const refreshTree = () => {
    setRefresh(refresh + 1)
  };

  return (
    <div className='renderedPage' data-testid='RenderedPage'>
      <Header />
      <NavBarContainerRendered
        files={props.filesArr}
        username={props.username}
        useLoadStatus={props.useLoadStatus}
        project={props.project}
      />
      <DashBoard refresh={refresh} onClick={refreshTree} username={props.username} projName={props.project}/>
    </div>
  );
}
