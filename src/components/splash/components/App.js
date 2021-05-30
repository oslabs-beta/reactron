import React from 'react';
import {useState} from 'react';
import MainContainer from './MainContainer';
import AppContainer from '../../AppContainer.jsx';
// import username from '/Users/kerricrawford/Desktop/coding/production-project/reactron/userInfo/currUser.js';
import LoginPage from '../../login/LoginPage.js'
import RenderedPage from '../../RenderedPage.jsx'
import LandingPage from '../../LandingPage.jsx'


function App() {
  const [view, useView] = useState('splash');
  // const [user, useUser] = useState(username);
  if (view === 'splash') return <RenderedPage useView={useView} />;
  else return <AppContainer />;
}

export default App;
