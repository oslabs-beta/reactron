import React, { useState } from 'react';
import Header from './Header.jsx';
import NavBarContainer from './NavBar/NavBarContainer';
import NavBarContainerRendered from './NavBar/NavBarContainerRendered';
import FileExplorer from './NavBar/FileExplorer';
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
        project={props.project}
      />
      <DashBoard refresh={refresh} onClick={refreshTree} />
    </div>
  );
}
