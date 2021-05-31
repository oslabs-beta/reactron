import React from 'react';

export default function FileExplorer(props) {
  const returnArr = () => {
    const arr = [];
    props.files.forEach((file) => {
      if (file !== 'index.js') {
        arr.push(<b>{file.name}</b>);
        arr.push(<br />);
      }
    });
    return arr;
  };
  return <div className='FileExplorer'>{props.files ? returnArr() : ''}</div>;
}
