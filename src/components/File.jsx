import React from 'react';

export default function File(props) {
  return (
    <div>
      <button onClick={() => props.renderFile(props.name)}>{props.name}</button>
    </div>
  );
}
