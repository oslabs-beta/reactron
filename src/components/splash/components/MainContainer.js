import React from 'react';
import {NavBar} from './navbar';
import AboutReactron from './AboutReactron';
import Logo from './Logo';
import TeamMembers from './team_members';
import GifDisplay from './gif_display';

export default function MainContainer() {
  return (
    <div className="Wrapper">
      <div className="MainContainerDiv">
        <div className="App">
            <Logo />
          <header className="header">
            <NavBar />
          </header>
          <main>
            <AboutReactron />
          </main>
            <GifDisplay />
            {/* <footer className="footer"><TeamMembers /></footer> */}
            <TeamMembers />
        </div>
      </div>
    </div>
  );
}
