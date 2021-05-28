import React from 'react';
import { useState } from 'react';
import MainContainer from './MainContainer';
import AppContainer from '../../AppContainer.jsx';

function App() {
  const [view, useView] = useState('splash');
  if (view === 'splash') return <MainContainer useView={useView} />;
  else return <AppContainer />;
}

export default App;
