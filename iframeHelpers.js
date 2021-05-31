var iframeDocument = document.getElementsByTagName("iframe")[1].contentDocument;

const _rootNode = (() => {
  // Finds all children of body tag
  const elems = iframeDocument.querySelector('body').children;
  for (let el of elems) {
    if (el._reactRootContainer) {
      // Returns root React node
      return el._reactRootContainer._internalRoot.current;
    }
  }
})();