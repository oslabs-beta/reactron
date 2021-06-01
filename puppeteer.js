const puppeteer = require('puppeteer');

module.exports = async function getRoot(url) {
  const browser = await puppeteer.launch({
    headless: true,
    devTools: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();

  // Allows puppeteer to "act" as a different user rather than the default headless browser user
  page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  );

  await page.goto(url);
  await page.waitForSelector('body');

  const nodeData = page
    .evaluate(async () => {
      // Locates the root React node and returns
      const _rootNode = (() => {
        // Finds all children of body tag
        const elems = document.querySelector('body').children;
        for (let el of elems) {
          if (el._reactRootContainer) {
            // Returns root React node
            return el._reactRootContainer._internalRoot.current;
          }
        }
      })();

      console.log('this is the root node', _rootNode);

      function parentFinder(node) {
        if (!node.return) return;
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
            (this.parent = parent),
            (this.children = []),
            (this.color = findColor()),
            (this.pathProps = { className: findColor() }),
            (this.textProps = { x: -25, y: 25 });
        }
      }

      // Requisite for obtaining root node's name
      // Ends up being an array with react component objects that point to their parent
      const treeNodes = [new Node('App', null)];

      const state = [];

      // Traverses react fiber nodes similar to a linked list
      function fiberFinder(node) {
        if (node.sibling !== null) {
          // If it has a sibling, and the sibling has a type property with a name, it is a React component
          if (node.sibling.type.name) {
            const parent = parentFinder(node.sibling);
            treeNodes.push(new Node(node.sibling.type.name, parent));
            console.log('here');
          }
          fiberFinder(node.sibling);
        }
        if (node.child !== null) {
          // If it has a child, and the child has a type property with a name, it is a React component
          if (node.child.type.name) {
            const parent = parentFinder(node.child);
            treeNodes.push(new Node(node.child.type.name, parent));
          }
          fiberFinder(node.child);
        }
      }
      fiberFinder(_rootNode);

      console.log(state);

      // App
      //  - Header
      //  - Nav
      for (let i = 0; i < treeNodes.length; i += 1) {
        // if node parent prop exist, assign node name to child of parent property
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

      rootObj = treeNodes[0];
      console.log(rootObj);

      return rootObj;
    })
    .catch((err) => {
      console.log(err);
    });
  return nodeData;
};
