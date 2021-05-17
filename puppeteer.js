const puppeteer = require('puppeteer');

// Inspiration for fiber walk taken with love from ReactION.

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

      // Function that accepts root node and returns whole application's node data
      function fiberSearch(entry) {
        let dataArr = [],
          mainID = 1;
        // Recursive function to traverse fiber tree passing in rootNode
        // Iterates through each node's children and siblings and passes applicable
        // data into dataArr, and returns dataArr
        function traversal(root, level, parentId) {
          console.log(root);
          // if Element has a sibling, recursively calls traversal again
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
          console.log(el);
          if (typeof el.name.type === null) {
            el.name = '';
          } else if (typeof el.name.type === 'function' && el.name.type.name) {
            el.name = el.name.type.name;
          } else if (typeof el.name.type === 'function') {
            el.name = 'function';
          } else if (typeof el.name.type === 'object') {
            el.name = 'function';
          } else if (typeof el.name.type === 'string') {
            el.name = el.name.type;
          }
          console.log(el);
        });

        // Setting root parent to an empty string
        dataArr[0].parentId = '';

        return dataArr;
      }
      return fiberSearch(_rootNode);
    })
    .catch((err) => {
      console.log(err);
    });
  return nodeData;
};
