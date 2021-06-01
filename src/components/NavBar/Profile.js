import React from 'react';

export default function Profile(props) {
  return (
    <div className='Profile'>
      {props.username ? `Welcome, ${props.username}` : 'Welcome'}
    </div>
  );
}
