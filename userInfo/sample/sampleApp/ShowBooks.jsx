import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowBooks = (props) => {
  

  const handleLibraryClick = () => {
    axios
      .post("/addBook", {
        title: props.title,
        author: props.author,
        user_id: props.userId,
        isbn: props.id,
      })
      .catch((e) => console.log(e));
  };

  return (
    <div id="bookComponent">
      <h3>{props.title}</h3>
      <img src={props.imgLink} />
      <h4>{props.author}</h4>
      <button id="addLibrary" onClick={handleLibraryClick}>
        I own this!
      </button>
    </div>
  );
};

export default ShowBooks;
