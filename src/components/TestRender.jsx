import React from 'react';
import { useEffect } from 'react';
import File from './File.jsx';

export default function TestRender(props) {
  const returnArr = () => {
    const arr = [];
    props.filesArr.forEach((file) => {
      arr.push(<File name={file.name} />);
    });
    return arr;
  };
  return <div>{returnArr()}</div>;
}
