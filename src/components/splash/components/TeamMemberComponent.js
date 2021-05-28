import React from 'react'


export default function TeamMemberComponent({test, image, github, linkedin}) {
  return (
    <div className="TeamMemberComponentDiv">
      <img className="profileImage" src={image} alt={`image${test}`}></img>
      <br></br>

      <a href={github}>Github</a>
      <br></br>
      <a href={linkedin}>Linkedin</a>
    </div>
  );
}




