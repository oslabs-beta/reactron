import React, { useState } from 'react';
import Tree from 'react-tree-graph';
import data from '../data.ts';
import '../tree.css';

//import func from filesyshelpers to write result of iframe scrape to data.ts file

// Component Tree for React Fiber Tree
// Currently renders a head node and a node component
// Probably will need to change once we figure out how to show the tree

//button needs to send a get request to server and call puppeteer as middle ware.
//or could try to figure out why the

export default function ComponentTree(props) {

  const findFrameNodes = () => {
      let _rootNode;
      const iframeDocument = document.getElementsByTagName("iframe")[1].contentDocument;
      const elems = iframeDocument.querySelector('body').children;
      for (let el of elems) {
        if (el._reactRootContainer) {
          // Returns root React node
          _rootNode = el._reactRootContainer._internalRoot.current
          console.log('rootNode', _rootNode);
        }
      }
      function parentFinder(node) {
        if (!node.return) return ;
        if (node.return.tag === 0 || node.return.tag === 1) {
          console.log(`This is the parent's name: ${node.return.type.name}`);
          return node.return.type.name;
        } else {
          return parentFinder(node.return);
        }
      }

      const objColors = [
        'cyan',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet',
        'orange',
      ];

      // Math.floor(Math.random() * objColors.length)
      function findColor() {
        // return objColors[Math.floor(Math.random() * objColors.length)];
        return objColors[5];
      }

      let rootObj;

      // class Node - corresponds to shape required for react tree graph
      class Node {
        constructor(name, parent) {
          (this.name = name),
            (this.parent = parent || 'root'),
            (this.children = []),
            (this.color = findColor()),
            (this.pathProps = { className: findColor() }),
            (this.textProps = { x: -25, y: 25 });
        }
      }

      // Requisite for obtaining root node's name
      // Ends up being an array with react component objects that point to their parent
      const treeNodes = [new Node('App', 'top')];

      const state = [];

      // Traverses react fiber nodes similar to a linked list
      function fiberFinder(node) {
        if (node.sibling !== null) {
          // If it has a sibling, and the sibling has a type property with a name, it is a React component
          console.log('node tpye',node.type)
          console.log('sibling type',node.sibling.type)
          if (node.sibling.type) {
            const parent = parentFinder(node);
            treeNodes.push(new Node(node.sibling.type.name, parent));
            
          }
          fiberFinder(node.sibling);
        }
        if (node.child !== null) {
          // If it has a child, and the child has a type property with a name, it is a React component
          console.log('node tpye',node.type)
          console.log('child type',node.child.type)
          if (node.child.type) {
            const parent = parentFinder(node);
            treeNodes.push(new Node(node.child.type.name, parent));
            
          }
          fiberFinder(node.child);
        }
      }
      fiberFinder(_rootNode);
      console.log('this is tree nodes', treeNodes)

      // console.log(state);

      // App
      //  - Header
      //  - Nav
      for (let i = 0; i < treeNodes.length; i += 1) {
        if (treeNodes[i].name) {
        // if node parent prop exist, assign node name to child of parent property
        console.log('which loop trough treeNodes', i)
          if (treeNodes[i].parent) {
            // Header -> App
            const parent = treeNodes[i].parent;
            // search through array to find elem in array where that parent val exists
            // if treeNodes[j] === App, push Header to App's children array
            for (let j = 0; j < treeNodes.length; j += 1) {
              if (treeNodes[j].name === parent) {
                treeNodes[j].children.push(treeNodes[i]);
                break;
              }
            }
          }
        }
      }

      rootObj = treeNodes[0];
      console.log('rootObj', rootObj);

      // return rootObj;
    
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
          findFrameNodes();
          props.onClick();
        }}>Refresh Tree</button>
        <p className='refresh'>{props.refresh}</p>
      </div>
      {/* <HeadNode />
      <Node /> */}
    </div>
  );
}