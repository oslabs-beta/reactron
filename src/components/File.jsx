import React from 'react';

export default function File(props) {
  return (
    <button onClick={() => props.renderFile(props.name)}
      className="FileExplorerButton"
    >{props.name}</button>
  );
}


