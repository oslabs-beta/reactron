import React, { useState } from 'react';
import Tree from 'react-tree-graph';
import data from '../data.ts';
import '../tree.css';

// Component Tree for React Fiber Tree
// Currently renders a head node and a node component
// Probably will need to change once we figure out how to show the tree

//button needs to send a get request to server and call puppeteer as middle ware.
//or could try to figure out why the

export default function ComponentTree(props) {

  const findTheDom = () => {
    const domChildren = document.getElementById('root').children
    console.log('domChildren', domChildren)
  }
  
  return (
    <div className='componentTree' data-testid='ComponentTree'>
      <h2 className="Componentlabel">Component Tree</h2>
      <div className='treeGraph' data-testid='Tree'>
        <Tree
          duration={3000}
          svgProps={{
            transform: 'rotate(90)'
          }}
          animated={true}
          data={data}
          nodeRadius={15}
          margins={{ top: 20, bottom: 80, left: 20, right: 60 }}
          gProps={{
            className: 'node',
          }}
          height={400}
          width={400}
          refresh={props.refresh}
        />
        <br />
        <button onClick={() => {
          props.onClick();
          findTheDom();
        }}>Refresh Tree</button>
        <p className='refresh'>{props.refresh}</p>
      </div>
      {/* <HeadNode />
      <Node /> */}
    </div>
  );
}