import React from 'react';
import ComicCard from './Comiccard.js'

const comicContainer = props => {
const comics = props.comics;
let toDisplay = [];
comics.forEach((comic) => {
  toDisplay.push(<ComicCard title={comic.title}issueNumber={comic.issueNumber}date={comic.date}grade={comic.grade}author={comic.author}illustrator={comic.illustrator}id={comic._id}deleteComic={props.deleteComic}updateComic={props.updateComic}/>)
})
  return (
    <div classname='comiccontainer'>
      {toDisplay}
    </div>
  )
}
export default comicContainer;
