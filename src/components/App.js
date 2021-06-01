import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AppContainer from './AppContainer.jsx';
import LoginPage from './login/LoginPage.js';
import { useState } from 'react';
import RenderedPage from './RenderedPage.jsx';
import LandingPage from './LandingPage.jsx';
import Cookies from 'js-cookie';

export default function App() {
  const [username, useUsername] = useState(Cookies.get('username'));
  if (username === undefined) return <LoginPage useUsername={useUsername} />;
  if (username === 'demo') return <RenderedPage username={username} />;
  else return <LandingPage username={username} />;
}
