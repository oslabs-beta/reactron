import React from 'react';
import { useState } from 'react';
import filesysHelpers from '../../filesysHelpers.js';
import axios from 'axios';

// Will house the landing page / initial render page
// Will import files from here

export default function LandingPage(props) {
  const [staticFile, useStaticFile] = useState();

  const [components, useComponents] = useState();

  const tempFunc = (newComponents) => {
    console.log(newComponents);
    //axios.post('/fs/upload', { item: newComponents });
  };

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
        console.log(data);
        data.forEach((elem) => {
          tempArr.push(elem.getFile().then((res) => res.text()));
          //.then((data) => console.log(data));
        });
        console.log(tempArr);
        Promise.all(tempArr).then((res) =>
          axios.post('/fs/upload', { item: res })
        );
      });

    // Promise.all([tempArr]).then((data) => console.log(data));
    // axios.post('/fs/upload', { item: data[0] })

    props.useLoadStatus(true);
  };

  return (
    <div className='landingPage'>
      <h1>Welcome to Reactron</h1>
      <p>
        For Reactron to properly read your React application, please upload your
        project below. Your static files and React components should each be
        placed in their own separate directory as shown below.
      </p>
      <p>
        <b>StaticDirectory</b>
        <br /> - index.html
        <br /> - style.css
        <br /> - style.scss
        <br />
        <br />
        <b>ComponentDirectory</b>
        <br /> - App.jsx
        <br /> - Home.jsx
        <br /> - Shop.jsx
        <br /> - Blog.jsx
      </p>
      <div>
        <b>Static Files</b>
        <p>Please upload your static directory here.</p>
        <p>
          {staticFile
            ? `The ${
                staticFile[Object.keys(staticFile)[0]].handle.name
              } directory has been uploaded`
            : ''}
        </p>
        <button id='static' onClick={staticOnClick}>
          Select File Here
        </button>
      </div>
      <div>
        <br />
        <b>Component Files</b>
        <p>Please upload your component directory here.</p>
        <p>
          {components
            ? `The ${
                components[Object.keys(components)[0]].handle.name
              } directory has been uploaded`
            : ''}
        </p>
        <button id='component' onClick={componentOnClick}>
          Select File Here
        </button>
      </div>
      {staticFile && components ? (
        <p>
          Your files have been successfully uploaded. Hit the next button for
          Reactron to begin the rendering process.
          <br />
          <button onClick={submitDirs}>Next</button>
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
