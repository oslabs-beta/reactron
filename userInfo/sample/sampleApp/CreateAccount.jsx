import React, {useState} from "react";
import axios from 'axios'


const CreateAccount = (props) => {
   const [username, setUserName] = useState("")
   const [password, setPassword] = useState("")
   const [name, setName] = useState("")
   const [location, setLocation] = useState("")

   const handleSubmit = (evt)=>{
      evt.preventDefault();
      axios.post('/register', {'username': username, 'password':password, 'name': name, 'location':location})
      .then(function (response) {
          if(response) location.reload()
      })
      .catch(e => console.log(e))
   }
     return(
         <div id='maincontainer'>
          <div id='leftdiv'></div>
      <div id='rightdiv'>
          <h2>Sign up!</h2>
         <form onSubmit = {handleSubmit}>
             <label>
                 Username: 
                 <input className='textField' type = "text" value={username} onChange={e => setUserName(e.target.value)} />
             </label><br/>
             <label>
                 Password:
                 <input className='textField' type = "password" value = {password} onChange = {e=> setPassword(e.target.value)}/>
             </label><br/>
             <label>
                 Name:
                 <input className='textField' type = "text" value = {name} onChange = {e=> setName(e.target.value)} />
             </label><br/>
             <label>
                 Location:
                 <input className='textField' type = "text" value = {location} onChange = {e=>setLocation(e.target.value)}/>
             </label><br/>
             
             <input className='button' type='submit' value='Sign up!'/>
         </form>
      </div>
   </div>
)
}


export default CreateAccount;