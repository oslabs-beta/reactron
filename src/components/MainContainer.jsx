import LandingPage from './LandingPage.jsx';
import RenderedPage from './RenderedPage.jsx';
import React from 'react';
import { useState } from 'react';
import username from '/Users/kerricrawford/Desktop/coding/production-project/reactron/userInfo/currUser.js';

// Houses the future conditional rendering
// If file has not been imported, landing page should display
// If file has been imported, rendered page should display

export default function MainContainer() {
  const [loadStatus, useLoadStatus] = useState(false);
  const [filesArr, useFilesArr] = useState([]);
  const [user, useUser] = useState(username);

  return (
    <div className='mainContainer'>
      <RenderedPage />
      {/* {loadStatus ? (
        <RenderedPage filesArr={filesArr} />
      ) : (
        <LandingPage useLoadStatus={useLoadStatus} useFilesArr={useFilesArr} />
      )} */}
      {/* <LandingPage /> */}
    </div>
  );
}
