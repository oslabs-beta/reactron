import React from 'react';
import axios from 'axios';

export default function ReactComponent() {
  return (
    <div className='reactComponent'>
      <iframe src='http://localhost:3000/secret' id='test'></iframe>
    </div>
  );
}
