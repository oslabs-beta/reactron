import React from 'react';
import File from './File.jsx';
import axios from 'axios';

export default function FileList(props) {
  const renderFile = (name) => {
    axios.post('/fs/individual', { name });
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
