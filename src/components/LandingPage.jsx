import React from 'react';
// import logo from '../../assets/logo.png';
import { useState } from 'react';
import filesysHelpers from '../../filesysHelpers.js';
import axios from 'axios';
import NavBarContainer from './NavBar/NavBarContainer';
import PreviousFiles from './NavBar/PreviousFiles';
import Header from './Header.jsx';

// Will house the landing page / initial render page
// Will import files from here
export default function LandingPage(props) {

  const [staticFile, useStaticFile] = useState();

  const [components, useComponents] = useState();

  // opens file picker for style sheet
  const staticOnClick = async () => {
    const fileHandle = window.showOpenFilePicker();
    // native operation to file handle object
    fileHandle
      // gets single file, getFile is native operation
      .then((data) => data[0].getFile())
      // grabs the contents
      .then((res) => res.text())
      .then((data) => {
        // sends to the backend for upload
        axios.post('/fs/stylesheet', { item: data });
        // the hook to set static file
        useStaticFile(data);
      });
  };

  // opens window for component file picker
  const componentOnClick = async () => {
    // declare file handle constant for directory picker to grab the folder of components
    const fileHandle = await window.showDirectoryPicker();
    // declare results constant that receives data from the filesystem helper directory logger that turns the directory into a usable object
    const result = await filesysHelpers.directoryLogger(fileHandle);
    // the useComponents hook to set components
    useComponents(result);
  };


  // sends the file names and contents to the backend to be uploaded
  const submitDirs = async (e) => {
    // prevents default activity of event
    e.preventDefault();
    // gets the project name from the input box
    const projName = e.target[0].value;

    // organizing the files for the backend, found in filesysHelpers.js file
    filesysHelpers
    // recursively generates an array of all the component files
      .fileDisplay(components, 'componentFiles')
      .then(async (data) => {
        // declare temporary Array and name Arrays
        const tempArr = [];
        const nameArr = [];
        // iterates through the data
        data.forEach(async (elem) => {
          // this is the array of file names
          nameArr.push(elem.getFile().then((res) => res.name));
          // this is the array of file contents
          tempArr.push(elem.getFile().then((res) => res.text()));
        });
        // returns an array of fufilled promises
        const fileContents = await Promise.all(tempArr);
        const nameContents = await Promise.all(nameArr);
        
        // declares an empty result array
        const resultArr = [];

        
        for (let i = 0; i < fileContents.length; i += 1) {
          // when user authentication is implemeneted, file name needs to be updated:
          // 'username'/'projectname'/'filename'
          resultArr.push({
            name: nameContents[i],
            contents: fileContents[i],
          });
        }

        props.useFilesArr(resultArr);
        props.useProjName(projName);

        axios.post('/fs/upload', {
          files: resultArr,
          username: props.username,
          project: projName,
          style: staticFile,
        });

        props.useLoadStatus(true); //calls useloadStatus to change state to true
      });
  };

  return (
    <div className='landingPage' data-testid='LandingPage'>
      <NavBarContainer
        username={props.username}
        useFilesArr={props.useFilesArr}
        useProjName={props.useProjName}
        useLoadStatus={props.useLoadStatus}
      />
      <div className="LandingPageDashboard">
        <Header />
        <div className='instructions'>
          <p>
            Select a Previous Project from the Side
            <br />
            - OR - <br />
            Upload a New Project Below
            <br />
            {/* In order for Reactron to process your application files correctly,
            please follow these instructions. <br />
            If you have a CSS or SCSS file you would like processed, please upload
            it under the Static Directory. <br />
            Reactron will look for an <b>index.js</b> file that connects to an{' '}
            <b>App.jsx</b> component. Please upload your index.js, App.jsx, and
            any other component files in one directory under the Component
            Directory below. */}
          </p>
        </div>
        <div className='staticFiles'>
            <p>
            <b>StaticDirectory</b>
            <br /> <i>Example</i>
            <br /> - style.css
            <br /> <b>or</b>
            <br /> - style.scss
            <br />
            <br />
          </p>

          <b>Upload Styling</b>
          <button className='button' id='static' onClick={staticOnClick}>
            Select File
          </button>
          <p>{staticFile ? `The file has been uploaded` : ''}</p>
        </div>
        <div className='componentFiles'>
          <p>
            <b>Component Directory</b>
            <br /> <i>Example</i>
            <br /> - index.js
            <br /> - App.jsx
            <br /> - Component1.jsx
            <br /> - Component2.jsx
          </p>
          <b>Upload Components</b>
          <button className='button' id='component' onClick={componentOnClick}>
            Select Folder
          </button>
          <p>
            {components
              ? `The ${
                  components[Object.keys(components)[0]].handle.name
                } directory has been uploaded`
              : ''}
          </p>
        </div>
        {staticFile && components ? (
          <div className='next'>
            <p>
              Your files have been successfully uploaded. Give your project a name
              and hit the next button for Reactron to begin the rendering process.
            </p>
            <form onSubmit={submitDirs}>
              <input
                className="NextInputField"
                required
                type='text'
                placeholder='Give your project a name...'
              />
              <br />
              <button className='button' type='submit'>
                Next
              </button>
            </form>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
