import React from 'react';

export default function Profile(props) {
  return (
<<<<<<< HEAD
    <div className="Profile">
      <h2>Profile</h2>
=======
    <div className='Profile'>
      {props.username ? `Welcome, ${props.username}` : 'Welcome'}
>>>>>>> main
    </div>
  );
}
