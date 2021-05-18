const puppeteer = require('puppeteer');

module.exports = async function getRoot(url) {
  const browser = await puppeteer.launch({ headless: false, devTools: true });
  const page = await browser.newPage();
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
      ];

      // Math.floor(Math.random() * objColors.length)
      function findColor() {
        return objColors[Math.floor(Math.random() * objColors.length)];
      }

      let rootObj;

      // class Node
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

      const treeNodes = [new Node('App', null)];

      function fiberFinder(node) {
        if (node.sibling !== null) {
          if (node.sibling.type.name) {
            const parent = parentFinder(node.sibling);
            treeNodes.push(new Node(node.sibling.type.name, parent));
            console.log('here');
          }
          fiberFinder(node.sibling);
        }
        if (node.child !== null) {
          fiberFinder(node.child);
        }
      }
      fiberFinder(_rootNode);

      for (let i = 0; i < treeNodes.length; i += 1) {
        // if node parent prop exist, assign node name to child of parent property
        if (treeNodes[i].parent) {
          // Blog - App
          const parent = treeNodes[i].parent;
          // search through array to find elem in array where that parent val exists
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
