import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDatabaseBooks from './ShowDatabaseBooks.jsx'


const OrderBooks = ()=>{
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [add, setAdd] = useState('');
    const searchBooks = () => {
        setResults([]);
        axios('/search')
        .then(data=>console.log(data))
        // .then(data=>data.forEach(el => {
        //     const books = [];
        //     books.push([el.volumeInfo.title, el.volumeInfo.authors[0], el.volumeInfo.imageLinks.thumbnail, el.volumeInfo.industryIdentifiers[1].identifier]) 
        //     console.log(data)
        //     setResults(results => [...results, 
        //     <ShowDatabaseBooks 
        //         title = {books[0][0]} 
        //         author={books[0][1]} 
        //         imgLink = {books[0][2]}
        //         id = {books[0][3]}
        //     />])
            
        // }))
        .catch(e=>console.log(e))
        console.log(results)
    }     
        

    return(
        <div>
            <input id='searchBar' type='text' value={search} onChange={e => setSearch(e.target.value)}  />
            <button id='bookSearch' onClick={searchBooks}>Search</button>
            <div id = 'bookDisplay'>
                {results}
            </div>            
        </div>
    )
}

export default OrderBooks;