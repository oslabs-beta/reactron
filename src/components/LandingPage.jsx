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
    const fileHandle = await window.showDirectoryPicker();
    const result = await filesysHelpers.directoryLogger(fileHandle);
    useStaticFile(result);
  };

  const componentOnClick = async () => {
    const fileHandle = await window.showDirectoryPicker();
    const result = await filesysHelpers.directoryLogger(fileHandle);
    useComponents(result);
  };

  const submitDirs = async () => {
    const staticResults = await filesysHelpers.fileDisplay(
      staticFile,
      'staticFiles'
    );
    const componentResults = filesysHelpers
      .fileDisplay(components, 'componentFiles')
      .then((data) => {
        const tempArr = [];
        data.forEach((elem) => {
          tempArr.push(elem.getFile().then((res) => res.text()));
        });
        Promise.all(tempArr).then((res) =>
          axios.post('/fs/upload', { item: JSON.stringify(res) })
        );
      });

    props.useLoadStatus(true); //calls useloadStatus to change state to true
  };

  return (
    <div className='landingPage'>
      <div className='header'>
        <h1>Reactron</h1>
      </div>
      <div className='instructions'>
        <p>
          For Reactron to properly read your React application, please upload
          your project below. Please upload any CSS/SCSS files in a static
          directory and your React project's <b>development</b> bundle.
        </p>
      </div>
      <div className='staticInstr'>
        <p>
          <b>StaticDirectory</b>
          <br /> - index.html
          <br /> - style.css
          <br /> - style.scss
          <br />
          <br />
        </p>
      </div>
      <div className='componentInstr'>
        <p>
          <b>Bundle File</b>
          <br /> - bundle.js
        </p>
      </div>
      <div className='staticFiles'>
        <b>Static Files</b>
        <p>Please upload your static directory here.</p>
        <p>
          {staticFile
            ? `The ${
                staticFile[Object.keys(staticFile)[0]].handle.name
              } directory has been uploaded`
            : ''}
        </p>
        <button className='button' id='static' onClick={staticOnClick}>
          Select File Here
        </button>
      </div>
      <div className='componentFiles'>
        <b>Bundle File</b>
        <p>Please upload your bundle file here.</p>
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
            <button className="button" onClick={submitDirs}>Next</button>
          </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
