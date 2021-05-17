import LandingPage from './LandingPage.jsx';
import RenderedPage from './RenderedPage.jsx';
import React from 'react';
import { useState } from 'react';

// Houses the future conditional rendering
// If file has not been imported, landing page should display
// If file has been imported, rendered page should display

export default function MainContainer() {
  const [loadStatus, useLoadStatus] = useState(false);

  return (
    <div className='mainContainer'>
      <RenderedPage />
      {/* {loadStatus ? (
        <RenderedPage />
      ) : (
        <LandingPage useLoadStatus={useLoadStatus} />
      )} */}
    </div>
  );
}
