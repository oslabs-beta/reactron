// import styled from 'styled-components';
// import React from 'react';

// const getUser = async  () => {
//   const users = ['seymour-creates', 'odylic','kerriannercrawford','n8innate','SteeleCoale'];
//   const info = {}
//   users.forEach( user => {
//     fetch(`https://api.github.com/users/${user}`)
//     .then( resp => resp.json() )
//     .then( res => info[user] = res )
//   })
//   //console.log((info));
//   return await info;

// }

// console.log(getUser());

import React from 'react';
import TeamMemberComponent from './TeamMemberComponent';
import Kerripfp from '../../../assets/Kerripfp.png';
import Jimmypfp from '../../../assets/Jimmypfp.jpeg';
import Loganpfp from '../../../assets/Loganpfp.jpeg';
import Natepfp from '../../../assets/Natepfp.jpg';
import Romelopfp from '../../../assets/Romelopfp.jpeg';

export default function team_members() {
  return (
    <div className='TeamMembersWrapper'>
      <h2>Meet the Reactron Team</h2>
      <div className='TeamMembersDiv'>
        <TeamMemberComponent
          test={1}
          image={Kerripfp}
          linkedin={'https://linkedin.com/in/kerriannercrawford'}
          github={'https://github.com/kerriannercrawford'}
        />
        <TeamMemberComponent
          test={2}
          image={Jimmypfp}
          linkedin={'https://www.linkedin.com/in/jimmylindpt/'}
          github={'https://github.com/odylic'}
        />
        <TeamMemberComponent
          test={3}
          image={Loganpfp}
          linkedin={''}
          github={'https://github.com/SteeleCoale'}
        />
        <TeamMemberComponent
          test={4}
          image={Natepfp}
          linkedin={''}
          github={'https://github.com/n8innate'}
        />
        <TeamMemberComponent
          test={5}
          image={Romelopfp}
          linkedin={''}
          github={'https://github.com/Seymour-creates'}
        />
      </div>
    </div>
  );
}
