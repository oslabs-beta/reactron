import React, { useState, useEffect } from 'react';


//  >>> SHOULD ALLOW FOR THE CREATION OF A NEW SUBJECT  <<<


// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const SubjectCreator = props => {
  const [ name, nameOnChange ] = useInput('');
  const [ dev_type, devTypeOnChange ] = useInput('');
  const [ instructions, instructionsOnChange ] = useInput('');
  const [ nameError, setNameError ] = useState(null);
  const [ devTypeError, setdevTypeError ] = useState(null);
  const [ instructionsError, setinstructionsError ] = useState(null);
  
  const saveSubject = () => {
    // check if name is empty
    if (name === '') {
      setNameError('required');
    // check if height is not a number
    } else if(dev_type === ''){
      setdevTypeError('required');
    } else if(instructions === ''){
      setinstructionsError('required');
    } else {
      const body = {
        name,
        dev_type,
        instructions,
      };
      fetch('/api/newSubject', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log('subjectCreator fetch /api/newSubject: ERROR: ', err));
    }
  };

  // >>> useEffect to clear nameError when `name` is changed <<<
  useEffect(()=>{
    setNameError(null);
  }, [name]);
  
  useEffect(()=>{
    setdevTypeError(null);
  }, [dev_type]);  

  useEffect(()=>{
    setinstructionsError(null);
  }, [instructions]);


    return(
      <section id='subject-creator'>

        <h3>Start a new Subject?</h3>

        {/* Subject Name Input  */}
        <div className="createSubjectField">
          <label htmlFor="name">Name: </label>
          <br/>
          <input name="name" placeholder="React" value={name} onChange={nameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>

        {/* Dev Type Input  */}
        <div className="createSubjectField">
          <label htmlFor="devType">Dev Type: </label>
          <br/>
          <input name="devType" placeholder="Front-End/ Back-End" value={dev_type} onChange={devTypeOnChange} />
          {devTypeError ? (<span className="errorMsg">{devTypeError}</span>) : null}
        </div>

        {/* Instructions Input  */}
        <div className="createSubjectField">
          <label htmlFor="instructions">Instructions: </label>
          <br/>
          <textarea rows="4" cols="50" name="instructions" placeholder="First steps..." value={instructions} onChange={instructionsOnChange} />
          {instructionsError ? (<span className="errorMsg">{instructionsError}</span>) : null}
        </div>

        {/* Submit Buttons  */}
        <div className="createSubContainer">
          <button type="button" className="btnMain" onClick={saveSubject}>Save</button>
          {/* <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link> */}
        </div>
      
      </section>
    )

}


export default SubjectCreator;