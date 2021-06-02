import React from 'react';

export default function Cart(props) {
  const returnArr = () => {
    const arr = [];
    props.cart.forEach((elem) => {
      arr.push(<h1>{elem}</h1>);
    });
    return arr;
  };
  return <div>{returnArr()}</div>;
}
