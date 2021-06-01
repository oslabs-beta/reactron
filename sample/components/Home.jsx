import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [homeState, useHomeState] = useState('home state');
  return <div>Home</div>;
}
