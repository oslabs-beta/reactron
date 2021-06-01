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
  return (
    <div className="FileExplorer">
      <h2>Files Uploaded</h2>
      {props.files ? returnArr() : ''}
    </div>
  );
}
