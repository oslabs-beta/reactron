import LandingPage from './LandingPage.jsx';
import RenderedPage from './RenderedPage.jsx';
import Tree from 'react-tree-graph';
import data from '../data';
import '../tree.css';
import React from 'react';
import { useState } from 'react';

// Houses the future conditional rendering
// If file has not been imported, landing page should display
// If file has been imported, rendered page should display

export default function MainContainer() {
  const [loadStatus, useLoadStatus] = useState(false);

  // const App: React.FC = (props: any) => {
  //   const handleClick = (event: any, node: any) => {
  //     console.log('handle click ', event);
  //     console.log('handle click node', node);
  //     alert(`${node} got clicked`);
  //   }

  return (
    <div className='mainContainer'>
      <RenderedPage />
      {/* {loadStatus ? (
        <RenderedPage />
      ) : (
        <LandingPage useLoadStatus={useLoadStatus} />
      )} */}
      {/* 
      <Tree
        animated={true}
        data={data}
        nodeRadius={15}
        margins={{ top: 20, bottom: 10, left: 20, right: 200 }}
        gProps={{
          className: 'node',
          onClick: handleClick,
        }}
        height={700}
        width={1000}
      /> */}
    </div>
  );
}
