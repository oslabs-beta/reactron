import React from 'react';
import File from '../File.jsx'
import axios from 'axios'

export default function FileExplorer(props) {
  const renderFile = (name) => {
    axios.post('/fs/individual', {name: name, username: 'sample', project: 'sampleApp'
  })
  .then(res => {
    const iframe = document.getElementById('indcomp')
    iframe.src = iframe.src;
  })
  .catch(err => console.log(err))
}

  const returnArr = () => {
    const arr = [];
    props.files.forEach((file) => {
      if (file !== 'index.js') {
        arr.push(<File name={file.name} renderFile={renderFile}/>);
      }
    });
    return arr;
  };
  return <div className='FileExplorer'>{props.files ? returnArr() : ''}</div>;
}
