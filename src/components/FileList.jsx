import React from 'react';
import File from './File.jsx';
import axios from 'axios';

export default function FileList(props) {
  const renderFile = (name) => {
    console.log('got into render file');
    try {
      console;
      axios
        .post('/fs/individual', {
          name,
          username: 'sample',
          project: 'sampleApp',
        })
        .then(() => {
          let iframe = document.getElementById('indcomp');
          iframe.src = iframe.src;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    console.log('after post');
  };

  const returnArr = () => {
    const arr = [];
    props.files.forEach((file) => {
      arr.push(<File name={file.name} renderFile={renderFile} />);
    });
    return arr;
  };
  return <div className='componentTree'>{returnArr()}</div>;
}
