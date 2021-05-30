import React from 'react';
import File from './File.jsx';
import axios from 'axios';

export default function FileList(props) {
  const renderFile = (name) => {
    try {
      axios
        .post('/fs/individual', {
          name,
          username: 'sample',
          project: 'sampleApp',
        })
        .then(() => {
          // This is like pressing refresh on the iframe
          // HOT MOD RE LOD
          let iframe = document.getElementById('indcomp');
          iframe.src = iframe.src;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const returnArr = () => {
    const arr = [];
    props.files.forEach((file) => {
      arr.push(<File name={file.name} renderFile={renderFile} />);
    });
    return arr;
  };
  // TODO: remove index.js file
  return <div className='componentTree'>{returnArr()}</div>;
}
