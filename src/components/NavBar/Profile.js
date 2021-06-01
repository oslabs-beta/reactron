import React from 'react';

export default function Profile(props) {
  return (
    <div className='Profile'>
      <h2>Welcome {props.username}</h2>
    </div>
  );
}
