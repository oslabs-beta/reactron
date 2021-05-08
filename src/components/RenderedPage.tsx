import React from 'react';
import Header from './Header';
import ComponentTree from './ComponentTree';
import Visualizer from './Visualizer';

export default function RenderedPage() {
  return (
    <div>
      <Header />
      <ComponentTree />
      <Visualizer />
    </div>
  );
}
