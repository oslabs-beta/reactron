import React from 'react';
import HeadNode from './HeadNode';
import Node from './Node';

// Component Tree for React Fiber Tree
// Currently renders a head node and a node component
// Probably will need to change once we figure out how to show the tree

export default function ComponentTree() {
  return (
    <div className='componentTree'>
      <HeadNode />
      <Node />
    </div>
  );
}
