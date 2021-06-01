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
  const [filesArr, useFilesArr] = useState([]);
  const [loadStatus, useLoadStatus] = useState(false);

  if (username === undefined) return <LoginPage useUsername={useUsername} />;
  if (username === 'demo')
    return <RenderedPage username={username} filesArr={filesArr} />;
  else
    return (
      <div>
        {loadStatus ? (
          <RenderedPage filesArr={filesArr} username={username} />
        ) : (
          <LandingPage
            username={username}
            useFilesArr={useFilesArr}
            useLoadStatus={useLoadStatus}
          />
        )}
      </div>
    );
}
