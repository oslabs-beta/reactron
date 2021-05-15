const fsHelpers = {};

fsHelpers.result = {};

fsHelpers.directoryLogger = async (fileHandle) => {
  const fileObj = {};
  fileObj[fileHandle.name] = {
    handle: fileHandle,
    files: [],
  };
  for await (let [name, handle] of fileHandle) {
    if (
      handle.kind === 'directory' &&
      handle.name[0] !== '.' &&
      handle.name !== 'node_modules'
    ) {
      const result = await fsHelpers.directoryLogger(handle);
      fileObj[fileHandle.name].files.push(result);
    } else if (handle.kind === 'file' && handle.name !== '.DS_Store') {
      fileObj[fileHandle.name].files.push(handle);
    }
  }
  return fileObj;
};

fsHelpers.fileDisplay = async (filesArray, type) => {
  const fileAdded = filesArray[Object.keys(filesArray)[0]].files;
  const fileObj = [];
  fileAdded.forEach((elem) => {
    if (elem.kind) {
      // these are regular files
      fileObj.push(elem);
    } else if (elem[Object.keys(elem)[0]].handle.kind) {
      // these are directories
      const res = fsHelpers.fileDisplay(elem);
      res.then((data) => fileObj.push(...data));
    }
  });
  fsHelpers.result[type] = fileObj;
  return fileObj;
};

// .getfile
// .text

fsHelpers.compileResults = async (components) => {};

fsHelpers.addTransform = async (component) => {
  const file = await component.getFile();
  return await file.text();
};

export default fsHelpers;

// Fake File Structure
// plainHTMLapp
// - index.html
// - fakeFolder
//    - style.css
// - script.js

//directoryLogger results
// {
//   plainHTMLapp: {
//     handle: **fileHandle uploaded from API - has a kind {directory} and name {plainHTMLapp} property**,
//     files: [
//       {**full fileHandle uploaded from API. some props blw**
//         kind: file,
//         name: index.html
//       },
//       {fakeFolder: {
//         handle: **fileHandle uploaded from API - has a kind {directory} and name {fakeFolder} property**,
//         files: [
//           {**full fileHandle uploaded from API. some props blw**
//             kind: file,
//             name: style.css
//           },
//         ]
//       }
//       },
//       {**full fileHandle uploaded from API. some props blw**
//         kind: file,
//         name: script.js
//       },
//     ]
//   }
// }

// fileDisplay results
// result object
// {
//   static or Component based on what uploaded: [
//     {**full fileHandle uploaded from API. some props blw**
//      kind: file,
//      name: index.html
//     },
//     {**full fileHandle uploaded from API. some props blw**
//      kind: file,
//      name: style.css
//     },
//     {**full fileHandle uploaded from API. some props blw**
//      kind: file,
//      name: script.js
//     },
//   ],
// }
