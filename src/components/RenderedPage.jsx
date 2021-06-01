import React, { useState } from 'react';
import Header from './Header.jsx';
import NavBarContainer from './NavBar/NavBarContainer';
import NavBarContainerRendered from './NavBar/NavBarContainerRendered';
import FileExplorer from './NavBar/FileExplorer'
import DashBoard from './DashBoard';

// Page that will show once directory has been imported
export default function RenderedPage(props) {
  const [view, useView] = useState('full');
  const [refresh, setRefresh] = useState(0);

  const refreshTree = () => {
    fetch('/fs/rerender')
      .then((res) => {
        console.log('response in tree rerender', res);
      })
      .then((res) => {
        setRefresh(refresh + 1);
        console.log('tree click', refresh);
      })
      .catch((err) => console.log('error in tree rerender', err));
  };

  
  return (
    <div className='renderedPage' data-testid='RenderedPage'>
      <Header />
      <NavBarContainerRendered files={props.filesArr} />
      <DashBoard refresh={refresh}onClick={refreshTree}/>
    </div>
  );
}
