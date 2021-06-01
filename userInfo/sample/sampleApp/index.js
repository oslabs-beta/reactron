import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';


render (
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root'),
  );
  
  
  //OLD CODE
  // import ReactDOM from 'react-dom';
  // ReactDOM.render(<App />, document.getElementById('root'));