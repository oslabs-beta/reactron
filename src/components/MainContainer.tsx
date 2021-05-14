import LandingPage from './LandingPage';
import RenderedPage from './RenderedPage';
import React from 'react';

// Houses the future conditional rendering
// If file has not been imported, landing page should display
// If file has been imported, rendered page should display

export default function MainContainer() {
  return (
    <div className='mainContainer'>
      <LandingPage />
      <RenderedPage />
    </div>
  );
}
