import React, {Component} from 'react';
import AddComicForm from './Addcomic.js';
import UpdateComicForm from './Updatecomicform.js'

const AddOrUpdate = props => {
    const updateNeeded = props.state.updateNeeded;
    let form;
    if (updateNeeded === false){
      form = <AddComicForm addBook={props.addBook} />
    }
    if (updateNeeded === true){
      form = <UpdateComicForm state={props.state}submitUpdatedComic={props.submitUpdatedComic} />
    }
    return (
      <div>
        {form}
      </div>
    )
  }

export default AddOrUpdate;