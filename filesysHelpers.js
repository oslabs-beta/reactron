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
//files array is actually an object
fsHelpers.fileDisplay = async (filesObject, type) => {
  const fileAdded = filesObject[Object.keys(filesObject[0])].files; //gives array of keys
  const fileArr = [];
  fileAdded.forEach((elem) => {
    //gets first key in object
    if (elem.kind) {
      //if element has a kind it means its a regular file
      // these are regular files
      fileArr.push(elem);
    } else if (elem[Object.keys(elem)[0]].handle.kind) {
      //this checks if the object is a directory
      // these are directories
      const res = fsHelpers.fileDisplay(elem); //this returns a promise and recursively calls filedisplay on the nested directory
      res.then((data) => fileArr.push(...data));
    }
  });
  fsHelpers.result[type] = fileArr;
  return fileArr;
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
