const fsHelpers = {};

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
    } else if (handle.kind === 'file') {
      fileObj[fileHandle.name].files.push(handle);
    }
  }
  return fileObj;
};

fsHelpers.fileDisplay = async (filesArray) => {
  filesArray.forEach((elem) => {
    if (elem.kind) {
      // these are regular files
    } else if (elem[Object.keys(elem)[0]].handle.kind) {
      // these are directories
      fsHelpers.fileDisplay(elem[Object.keys(elem)[0]].files);
    }
  });
};

module.exports = fsHelpers;
