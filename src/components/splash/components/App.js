import React from 'react';
import {useState} from 'react';
import MainContainer from './MainContainer';
import AppContainer from '../../AppContainer.jsx';
// import username from '/Users/kerricrawford/Desktop/coding/production-project/reactron/userInfo/currUser.js';

function App() {
  const [view, useView] = useState('splash');
  const [user, useUser] = useState();
  if (view === 'splash') return <MainContainer useView={useView} />;
  else return <AppContainer />;
}

export default App;
