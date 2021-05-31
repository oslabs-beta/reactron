import React from 'react';
import Header from './Header.jsx';
import NavBarContainer from './NavBar/NavBarContainer';
import DashBoard from './DashBoard';

// Page that will show once directory has been imported
export default function RenderedPage(props) {
  // const [view, useView] = useState('full');

  return (
    <div className='renderedPage' data-testid='RenderedPage'>
      <Header />
      <NavBarContainer files={props.filesArr} />
      <DashBoard />
    </div>
  );
}
