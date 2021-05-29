import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { navigate, useRoutes, A } from "@patched/hookrouter";
const LogOut = () => {
  const handleClick = () => {
    axios
      .delete("/logout", { please: "log me out Mr.Server" })
      .then(function (response) {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };
  return (
    <ul id="navList">
      <li>
        <A href="/dashboard">My Library</A>
      </li>
      <li>
        <A href="/addBooks">Add to Libary</A>
      </li>
      <li>
        <A href="/orderBooks">Order a book</A>
      </li>
      <li>
        <A href="/notifications">
          <FontAwesomeIcon icon={faBell} />
        </A>
      </li>
      <li>
        <A href="/">
          <FontAwesomeIcon icon={faUserCog} />
        </A>
      </li>
      <li>
        <FontAwesomeIcon icon={faDoorClosed} onClick={handleClick} />
      </li>
    </ul>
  );
};

export default LogOut;
