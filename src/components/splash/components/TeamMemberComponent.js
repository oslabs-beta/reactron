import React from 'react';

export default function TeamMemberComponent({ name, test, image, github, linkedin}) {
  return (
    <div className="TeamMemberComponentDiv">
      <img
        className="profileImage"
        src={image}
        alt={`image${test}`}
        target="_blank"
      ></img>
      <br></br>
      <br></br>
      <a href={github} target="_blank">
        Github
      </a>
      <br></br>
      <a href={linkedin} target="_blank">
        Linkedin
      </a>
    </div>
  );
}
