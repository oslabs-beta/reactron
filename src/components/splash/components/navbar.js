import React from 'react';
export function NavBar(props) {
  return (
    <div className='NavBar'>
      <a className='website_link' onClick={() => props.useView('other')}>
          Reactron.io       
      </a>
      <a className='team_link' href='https://github.com/oslabs-beta/reactron'>
        The Team
      </a>
    </div>
  );
}
