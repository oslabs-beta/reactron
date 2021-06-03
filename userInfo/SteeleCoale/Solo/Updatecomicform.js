import React from 'react';

const updateComicForm = props => {
  const {bookToUpdate} = props.state;
  
  return (
    <div>
        <h2 classname='formHeading'>Update That Comic Here</h2>
        <p classname='formDirections'>(please re-enter all forms)</p>
      <form onSubmit={props.submitUpdatedComic} > 
        <input name='title'type='text'placeholder={bookToUpdate.title} />
        <input name='issueNumber'type='text'placeholder={bookToUpdate.issueNumber} />
        <input name='date'type='text'placeholder={bookToUpdate.date} />
        <input name='grade'type='text'placeholder={bookToUpdate.grade} />
        <input name='author'type='text'placeholder={bookToUpdate.author} />
        <input name='illustrator'type='text'placeholder={bookToUpdate.illustrator} />
        <input type='submit' value='Update that comic in your database' />
      </form>

    </div>
  )
  // title: {type: String, required: true},
  // issueNumber: {type: String, required: true},
  // date: String,
  // grade: String,
  // author: String,
  // illustrator: String,
  // cover: String,
  // user: String,
}

export default updateComicForm;