import LandingPage from './LandingPage';
import RenderedPage from './RenderedPage';
import React from 'react';

// conditional rendering in future

export default function MainContainer() {
  return (
    <div>
      <LandingPage />
      <RenderedPage />
    </div>
  );
}
