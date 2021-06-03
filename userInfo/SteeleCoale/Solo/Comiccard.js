import React from 'react';

const ComicCard = props => {
  // const {what props to get/how to get an array objects?} = props;
  
  return (
    <div classname='comicCardContainer'>
      <div classname='cardTitle'>
        <h3>{props.title}</h3>
        <h4>Price:</h4>
      </div>
      <ul classname='comicDetailsList'>
        <li classname='comicDetail'>{props.issueNumber}</li>
        <li classname='comicDetail'>{props.date}</li>
        <li classname='comicDetail'>{props.grade}</li>
        <li classname='comicDetail'>{props.author}</li>
        <li classname='comicDetail'>{props.illustrator}</li>
      </ul>
        <button classname='updateComicButton'onClick={() => props.updateComic(props.id)}>Update Comic</button>
        <button classname='deleteComicButton'onClick={() => props.deleteComic(props.id)}>Remove Comic</button>
    </div>
  )
}

export default ComicCard;