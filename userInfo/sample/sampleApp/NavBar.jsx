import React from "react";

import LogInForm from "./Login.jsx";
import LogOut from "./Logout.jsx";

const NavBar = (props) => {
  let logInStatus = props.logInStatus;
  let component;
  if (logInStatus === true) component = <LogOut />;
  else if (logInStatus === false)
    component = (
      <LogInForm userId={props.userId} login={props.login} updateUserId={props.updateUserId} />
    );

  return (
    <div id="navContainer">
      <h1>Axolotl Library</h1>
      <div id="logins">{component}</div>
    </div>
  );
};

export default NavBar;
