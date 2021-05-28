import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowBooks from "./ShowBooks.jsx";

const SearchAndAdd = (props) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [add, setAdd] = useState("");
  const searchBooks = (props) => {
    setResults([]);
    axios(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBvzRvXUMUGGeATujnaMUbaQS9dxclLbOk`
    ).then((data) => data.data.items)
      .then((data) =>
        data.forEach((el) => {
          const books = [];
          books.push([
            el.volumeInfo.title,
            el.volumeInfo.authors[0],
            el.volumeInfo.imageLinks.thumbnail,
            el.volumeInfo.industryIdentifiers[1].identifier,
          ])                 

          setResults((results) => [
            ...results,
            <ShowBooks
              userId={props.userId}
              title={books[0][0]}
              author={books[0][1]}
              imgLink={books[0][2]}
              id={books[0][3]}
            />
          ]);
        })
      )
      .catch((e) => console.log(e));
    console.log(results);
  };

  return (
    <div>
      <h1>Hey</h1>
      <input
        id="searchBar"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button id="bookSearch" onClick={searchBooks}>
        Search
      </button>
      <div id="bookDisplay">{results}</div>
    </div>
  );
};

export default SearchAndAdd;
