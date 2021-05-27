import React from 'react';
import { useState } from 'react';
import filesysHelpers from '../../filesysHelpers.js';
import axios from 'axios';

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
        useStaticFile(fileHandle);
      });
  };

  const componentOnClick = async () => {
    const fileHandle = await window.showDirectoryPicker();
    const result = await filesysHelpers.directoryLogger(fileHandle);
    useComponents(result);
  };

  const submitDirs = async () => {
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

        axios.post('/fs/upload', {
          files: resultArr,
          username: 'sample',
          project: 'sampleApp',
        });

        props.useLoadStatus(true); //calls useloadStatus to change state to true
      });
  };

  return (
    <div className='landingPage' data-testid="LandingPage" >
      <div className='header'>
        <h1>Reactron</h1>
      </div>
      <div className='instructions'>
        <p>
          In order for Reactron to process your application files correctly,
          please follow these instructions. <br />
          If you have a CSS or SCSS file you would like processed, please upload
          it under the Static Directory. <br />
          Reactron will look for an <b>index.js</b> file that connects to an{' '}
          <b>App.jsx</b> component. Please upload your index.js, App.jsx, and
          any other component files in one directory under the Component
          Directory below.
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
        <b>Static Files</b>
        <p>Please upload your static directory here.</p>
        <p>{staticFile ? `The  directory has been uploaded` : ''}</p>
        <button className='button' id='static' onClick={staticOnClick}>
          Select File Here
        </button>
      </div>
      <div className='componentFiles'>
        <b>Component Files</b>
        <p>Please upload your component files here.</p>
        <p>
          {components
            ? `The ${
                components[Object.keys(components)[0]].handle.name
              } directory has been uploaded`
            : ''}
        </p>
        <button className='button' id='component' onClick={componentOnClick}>
          Select File Here
        </button>
      </div>
      {staticFile && components ? (
        <div className='next'>
          <p>
            Your files have been successfully uploaded. Hit the next button for
            Reactron to begin the rendering process.
            <br />
            <button className='button' onClick={submitDirs}>
              Next
            </button>
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
