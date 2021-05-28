import LandingPage from './LandingPage.jsx';
import RenderedPage from './RenderedPage.jsx';
import React from 'react';
import { useState } from 'react';

// Houses the future conditional rendering
// If file has not been imported, landing page should display
// If file has been imported, rendered page should display

export default function MainContainer() {
  const [loadStatus, useLoadStatus] = useState(false);
  const [filesArr, useFilesArr] = useState([{name: 'sup'}, {name: 'tryme'}]);

  return (
    <div className='mainContainer'>
      <RenderedPage filesArr={filesArr} />
      {/* {loadStatus ? (
        <RenderedPage filesArr={filesArr} />
      ) : (
        <LandingPage useLoadStatus={useLoadStatus} useFilesArr={useFilesArr} />
      )} */}
      {/* <LandingPage /> */}
    </div>
  );
}
