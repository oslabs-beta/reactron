import React from 'react';
import ComponentTree from './ComponentTree.jsx';
import Visualizer from './Visualizer.jsx';
import IndividualComponent from './IndividualComponent.jsx';
import Blurb from './Blurb';

export default function DashBoard(props) {
  return (
    <div className='DashBoard'>
      <IndividualComponent />
      <Visualizer />
      <ComponentTree refresh={props.refresh} onClick={props.onClick} />
      <Blurb />
    </div>
  );
}
