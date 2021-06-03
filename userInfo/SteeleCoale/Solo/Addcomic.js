import React from 'react';

const AddComicForm = props => {

  return (
    <div>
        <h2 classname='formHeading'>Add Your Comic Here</h2>
      <form onSubmit={props.addBook}>
        <input name='title'type='text'placeholder='Comic Title' />
        <input name='issueNumber'type='text'placeholder='Issue Number' />
        <input name='date'type='text'placeholder='Date of Release' />
        <input name='grade'type='text'placeholder='Grade of book currently' />
        <input name='author'type='text'placeholder='Author' />
        <input name='illustrator'type='text'placeholder='Illustrator' />
        <input type='submit' value='Add comic to your database' />
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

export default AddComicForm;