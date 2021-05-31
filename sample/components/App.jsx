import React from 'react';
import Header from './Header.jsx';
import Nav from './Nav.jsx';
import { useState } from 'react';

export default function App() {
  const [appState, useAppState] = useState('app state');
  return (
    <div>
      <Header appState={appState} />
      <Nav />
    </div>
  );
}
