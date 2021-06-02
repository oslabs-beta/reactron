import React from 'react';
import logo from '../../assets/logo.png';
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

  const staticOnClick = async () => {
    const fileHandle = window.showOpenFilePicker();
    fileHandle
      .then((data) => data[0].getFile())
      .then((res) => res.text())
      .then((data) => {
        axios.post('/fs/stylesheet', { item: data });
        useStaticFile(data);
      });
  };

  const componentOnClick = async () => {
    const fileHandle = await window.showDirectoryPicker();
    const result = await filesysHelpers.directoryLogger(fileHandle);
    useComponents(result);
  };

  const submitDirs = async (e) => {
    e.preventDefault();
    const projName = e.target[0].value;

    filesysHelpers
      .fileDisplay(components, 'componentFiles')
      .then(async (data) => {
        const tempArr = [];
        const nameArr = [];
        data.forEach(async (elem) => {
          nameArr.push(elem.getFile().then((res) => res.name));
          tempArr.push(elem.getFile().then((res) => res.text()));
        });
        const fileContents = await Promise.all(tempArr);
        const nameContents = await Promise.all(nameArr);

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
      <div className='staticInstr'>
        <p>
          <b>StaticDirectory</b>
          <br /> <i>Example</i>
          <br /> - style.css
          <br /> <b>or</b>
          <br /> - style.scss
          <br />
          <br />
        </p>
      </div>
      <div className='componentInstr'>
        <p>
          <b>Component Directory</b>
          <br /> <i>Example</i>
          <br /> - index.js
          <br /> - App.jsx
          <br /> - Component1.jsx
          <br /> - Component2.jsx
        </p>
      </div>
      <div className='staticFiles'>
        <b>Upload Styling</b>
        <button className='button' id='static' onClick={staticOnClick}>
          Select File
        </button>
        <p>{staticFile ? `The file has been uploaded` : ''}</p>
      </div>
      <div className='componentFiles'>
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
          <br />
          <form onSubmit={submitDirs}>
            <input
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
  );
}
