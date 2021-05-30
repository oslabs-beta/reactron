import React from 'react';

export default function FileExplorer(props) {
  const returnArr = () => {
    const arr = [];
    props.files.forEach((file) => {
      arr.push(<b>{file.name}</b>);
    });
    return arr;
  };
  return <div className='FileExplorer'>{returnArr()}</div>;
}
