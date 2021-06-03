import React from 'react';

const SignIn = props => {
  let user = props.user
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input name='name'type='text'placeholder='Your Name Here' />
        <input type='submit' value='enter name'/>
      </form>
      <div>
        <h3>You are logged in as: {user}</h3>
      </div>
    </div>
    
    
  )
}

export default SignIn;