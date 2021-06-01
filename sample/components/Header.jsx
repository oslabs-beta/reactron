import React from 'react';
import { useState } from 'react';

export default function Header() {
  const [headerState, useHeaderState] = useState('header state');
  return <h1>This is a Header!</h1>;
}
