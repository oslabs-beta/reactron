import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Shop from './Shop.jsx';
import Cart from './Cart.jsx';

// export default function Nav() {
//   const components = [];
//   const onClick = () => {
//     components.push(<About />);
//   };
//   return (
//     <div>
//       <button onClick={onClick}>Click</button>
//       {components}
//     </div>
//   );
// }

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
    };
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onClickAdd() {
    const tempArr = this.state.components;
    tempArr.push(<About />);
    this.setState({ components: tempArr });
  }

  render() {
    const returnArr = [];
    for (let i = 0; i < this.state.components.length; i += 1) {
      returnArr.push(this.state.components[i]);
    }
    return (
      <div>
        <button onClick={this.onClickAdd}>Click</button>
        {returnArr}
        <h1>Under array</h1>
      </div>
    );
  }
}
