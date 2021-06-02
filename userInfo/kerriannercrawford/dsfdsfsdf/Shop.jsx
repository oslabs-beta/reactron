import React from 'react';

export default function Shop(props) {
  return (
    <div>
      <h1>Shop</h1>
      <ul>
        <li>
          <button onClick={() => props.addToCart('one')}>One</button>
        </li>
        <li>
          <button onClick={() => props.addToCart('two')}>Two</button>
        </li>
        <li>
          <button onClick={() => props.addToCart('three')}>Three</button>
        </li>
      </ul>
    </div>
  );
}
