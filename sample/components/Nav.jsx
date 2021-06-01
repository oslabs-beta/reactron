import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Shop from './Shop.jsx';
import Cart from './Cart.jsx';

export default function Nav() {
  const [cart, useCart] = useState([]);

  const addToCart = (item) => {
    const tempCart = [...cart];
    tempCart.push(item);
    useCart(tempCart);
  };

  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
        <Link to='/shop'>Shop</Link>
        <Link to='/cart'>Cart</Link>
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
        <Route path='/shop'>
          <Shop addToCart={addToCart} />
        </Route>
        <Route path='/cart'>
          <Cart cart={cart} />
        </Route>
      </Switch>
    </Router>
  );
}
