import React from 'react';
import demo from '../assets/demo.png';

export default function gif_display() {
  return (
    <div>
      <h2> Demo </h2>
      <div className="GifDisplayDiv">
        <img src={demo} alt="demo"></img>
      </div>
    </div>
  );
}
