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

      const testObj = { App: { parent: null, children: [] } };
      const rootObj = {
        name: 'App',
        color: findColor(),
        pathProps: { className: findColor() },
        textProps: { x: -25, y: 25 },
        children: [],
      };

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

      function fiberFinder(node) {
        if (node.sibling !== null) {
          if (node.sibling.type.name) {
            const parent = parentFinder(node.sibling);
            testObj[node.sibling.type.name] = {
              parent,
              children: [],
            };
          }
          fiberFinder(node.sibling);
        }
        if (node.child !== null) {
          if (node.child.type.name)
            console.log(`This node's name is ${node.child.type.name}`);
          fiberFinder(node.child);
        }
      }
      fiberFinder(_rootNode);
      console.log(testObj);

      for (const key in testObj) {
        // Author
        if (testObj[key].parent) {
          // Author . parent = Blog
          const parent = testObj[key].parent;
          // push value held to obj[key].children
          // Blog.children.push(Author)
          testObj[parent].children.push(key);
        }
      }

      for (const key in testObj) {
        const array = testObj[key].children;
        for (let i = 0; i < array.length; i += 1) {
          // array[i] === Blog
          const tempVar = array[i];
          array[i] = { name: tempVar, children: testObj[array[i]].children };
          // array[i] = {Blog: parent: App, children: []}
        }
      }

      //console.log(testObj.App);

      // Function that accepts root node and returns whole application's node data
      function fiberSearch(entry) {
        let dataArr = [],
          mainID = 1;

        // Recursive function to traverse fiber tree passing in rootNode
        // Iterates through each node's children and siblings and passes applicable
        // data into dataArr, and returns dataArr

        function traversal(root, level, parentId) {
          if (root.sibling !== null) {
            mainID += 1;
            dataArr.push({
              name: root.sibling,
              level: `${level}`,
              id: `${mainID}`,
              parentId: `${parentId}`,
              props: Object.keys(root.sibling.memoizedProps),
            });
            traversal(root.sibling, level, parentId);
          }
          // if Element has a child, recursively calls traversal again
          if (root.child !== null) {
            parentId += 1;
            mainID += 1;
            dataArr.push({
              name: root.child,
              level: `${level}`,
              id: `${mainID}`,
              parentId: `${parentId}`,
              display: 'none',
              props: Object.keys(root.child.memoizedProps),
            });
            traversal(root.child, level + 1, parentId);
          }
        }
        traversal(entry, 0, 0);
        // Extracts the type name of each fiber node

        dataArr.forEach((el) => {
          if (typeof el.name.type === null) {
            el.name = '';
          } else if (typeof el.name.type === 'function' && el.name.type.name) {
            // Grabs name of root if it is a React component
            el.name = el.name.type.name;
          } else if (typeof el.name.type === 'function') {
            el.name = 'function';
          } else if (typeof el.name.type === 'object') {
            el.name = 'function';
          } else if (typeof el.name.type === 'string') {
            el.name = el.name.type;
          }
        });
        // Setting root parent to an empty string
        dataArr[0].parentId = '';

        return dataArr;
      }
      //return fiberSearch(_rootNode);
    })
    .catch((err) => {
      console.log(err);
    });
  return nodeData;
};
