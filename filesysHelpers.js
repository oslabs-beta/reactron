const fsHelpers = {};

fsHelpers.result = {};

// accepts a directory handle and returns an object with all files and directories contained within
fsHelpers.directoryLogger = async (fileHandle) => {
  const fileObj = {};
  // sets a key on fileObj equal to name of initial directory
  fileObj[fileHandle.name] = {
    handle: fileHandle,
    files: [],
  };

  // intended structure of file obj
  // fileObj = {container: {handle: FILEHANDLE, files: [{name: something, file: something}]}}

  // iterates over fileHandle
  for await (let [name, handle] of fileHandle) {
    // if the current handle is a directory, is not a hidden file, and is not node modules
    if (
      handle.kind === 'directory' &&
      handle.name[0] !== '.' &&
      handle.name !== 'node_modules'
    ) {
      // recursive call to directory logger
      const result = await fsHelpers.directoryLogger(handle);
      // results of recursive call pushed to files array on object
      fileObj[fileHandle.name].files.push(result);
    } // if the file is a file and the name is not DS_Store, push to files array
    else if (handle.kind === 'file' && handle.name !== '.DS_Store') {
      fileObj[fileHandle.name].files.push(handle);
    }
  }
  return fileObj;
};

//files array is actually an object
fsHelpers.fileDisplay = async (filesObject, type) => {
  // fileAdded is set to the value of the first key on fileObject
  const fileAdded = filesObject[Object.keys(filesObject)[0]].files; //gives array of keys
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
  return fileArr;
};

export default fsHelpers;
