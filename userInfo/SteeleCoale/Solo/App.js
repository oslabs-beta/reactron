import React, {Component} from 'react';
import ComicContainer from './comiccontainer.js';
import SignIn from './signin.js';
import AddOrUpdate from './addorupdatecontainer.js';
// import './stylesheets/comicstyle.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      comics: [],
      updateNeeded: false,
      bookToUpdate: '',
    }
    this.handleSubmitUser = this.handleSubmitUser.bind(this);
    this.addBook = this.addBook.bind(this);
    this.deleteComic = this.deleteComic.bind(this);
    this.updateComic = this.updateComic.bind(this);
    this.submitUpdatedComic = this.submitUpdatedComic.bind(this);
    this.requestToEbay = this.requestToEbay.bind(this);
  }
handleSubmitUser(e) {
  e.preventDefault();
  console.log('a name', user, 'was submitted')
  console.log(this.state)
  let user = e.target.name.value
  e.target.reset();
  if (user.length > 3){
    this.setState({user: user})
  }
  fetch('/comics/' + `${this.state.user}`)
      .then(res => res.json())
      .then((comics) => {
        if (!Array.isArray(comics)) comics = [];
        return this.setState({
          comics,
        });
      })
      .catch(err => console.log(this.state, 'problem fetching comics from DB on submit user: ', err));
}
addBook(e){
  e.preventDefault();
  const newBook = {
    title: e.target.title.value,
    issueNumber: e.target.issueNumber.value,
    date: e.target.date.value,
    grade: e.target.grade.value,
    author: e.target.author.value,
    illustrator: e.target.illustrator.value,
    user: this.state.user
  }
  e.target.reset();
  console.log('a book was added', newBook)
  //post request with new book
  const requestOptions = {
    method: "POST",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(newBook)
  };
  fetch('/comics', requestOptions)
  .then(response => {
    console.log(response)
  }).catch(error => {
    console.log('there was an error sending the new book to the database:', error)
  })
  //get request for all comics with user name
  fetch('/comics/' + `${this.state.user}`)
      .then(res => res.json())
      .then((comics) => {
        if (!Array.isArray(comics)) comics = [];
        return this.setState({
          comics,
        });
      })
      .catch(err => console.log(this.state, 'problem fetching comics from Addbook: ', err));
  //setState with response
}
deleteComic(id){
  console.log(id)
  const idObj = {
    _id : id
  }
  const requestOptions = {
    method: "POST",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idObj)
  };
  fetch('/comics/delete', requestOptions)
  .then(res => console.log('this is the deleteComic response', res))
  .catch(error => console.log('this is the error from deleteComic', error))
  //make a request to delte document at id
  //then update current user collection on page
  fetch('/comics/' + `${this.state.user}`)
      .then(res => res.json())
      .then((comics) => {
        if (!Array.isArray(comics)) comics = [];
        return this.setState({
          comics,
        });
      })
      .catch(err => console.log('prolem retrieving updated comics after delete: ', err));
}
updateComic (id){
  if (this.state.updateNeeded === false){
    this.setState({updateNeeded : true})
  };
  const idObj = {
    _id : id
  }
  const requestObj = {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(idObj)
  }
  // console.log('this is requestObj:', requestObj)
  //<------THIS IS WHERE I LEFT OFF CAN"T FIGUREOUT WHY RESPONSE FROM THIS FETCH
  //ISN"T THE OBJECT THAT GETS LOGGED WHEN I MAKE THE REQUEST IN POSTMAN WITH THE SAME ID----->
  //then need to update state with that and pass values into update comic form as placeholders
  //then need to make another func to attach as button click in update form
  //to post that new info to the db, and then get all the current users books
  fetch('/comics/update', requestObj)
    .then(response => response.json())
    .then(result => {
       return this.setState({
        bookToUpdate: result
      })
    }).catch(err => {
      console.log(`error receiving oneToUpdate err: ${err}`)
    })

}
submitUpdatedComic (e){
  e.preventDefault();
  const bookToUpdate = {
    title: e.target.title.value,
    issueNumber: e.target.issueNumber.value,
    date: e.target.date.value,
    grade: e.target.grade.value,
    author: e.target.author.value,
    illustrator: e.target.illustrator.value,
    user: this.state.user,
    _id: this.state.bookToUpdate._id
  }
  const requestObj = {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(bookToUpdate)
  }
  // e.target.reset();
  // console.log('an upated comic was submitted', bookToUpdate)
  //fecth to update comic (findOneAndUpdate)
  fetch('/comics/update/' + `${this.state.bookToUpdate._id}`, requestObj)
  .then(result => {
    console.log('this is the updated comic from fetch app.js', result)
  }).catch(error => {
    console.log('error submitupdated fetch', error)
  });
  this.setState({
    updateNeeded: false,
    bookToUpdate: '',
  });
  fetch('/comics/' + `${this.state.user}`)
      .then(res => res.json())
      .then((comics) => {
        if (!Array.isArray(comics)) comics = [];
        return this.setState({
          comics,
        });
      })
      .catch(err => console.log(this.state, 'error fetching user books afer updated and then resettting state: ', err));

  //reset state upDateNeeded to false;
  //reset state book to update to '';
  //then get request for all of users books
}
requestToEbay (title, issueNumber){
  let keywords = Array.from(title.split(' ').concat(issueNumber.split(' ')));
  // console.log(keywords);
  let keywordString = keywords.join(',')
  // console.log(keywordString)
  let reqObj = {
    method: 'GET',
    headers: {
      'Authorization' :'Bearer v^1.1#i^1#I^3#f^0#p^1#r^0#t^H4sIAAAAAAAAAOVYa2wUVRTuttuSAkXkWesjmxGVhzN7Z3Z2ujvpbrJ9YLehL7fUWiFkHnfaYWdnxpk7tCsGS42NmFBfKCQmpvzRQNTqDxMLVIM/MBAfiRp+oIkxxbQaJSaiRX8Y786Wsq0GCl2liftnc+8959zvfOece89c0FdSunGgfmCyzLOocKgP9BV6PPQSUFpSvGlZUWFFcQHIEfAM9a3r8/YXTVTZQkoz+QehbRq6DX29KU23eXcyQjiWzhuCrdq8LqSgzSOJT8Qat/AMBXjTMpAhGRrhi9dGCFgZDFbSMsuKQjgUCIfxrH7ZZpsRIUJAhkBkJCgJlRwMA7xu2w6M6zYSdBQhGMDQJGBJhmmjQzwd5EGQYioDnYSvHVq2auhYhAJE1IXLu7pWDtarQxVsG1oIGyGi8djmRHMsXlvX1Fblz7EVneIhgQTk2DNHNYYMfe2C5sCrb2O70nzCkSRo24Q/mt1hplE+dhnMDcB3qVa4EEdzdACwlSGOYUN5oXKzYaUEdHUcmRlVJhVXlIc6UlH6WoxiNsSdUEJToyZsIl7ry/y1OoKmKiq0IkRddezhWEsLEd1idAl6jSGQCQShBmsMMlHdQTKSKAXpAAtJEJCCoqSEpjbKWpuiedZONYYuqxnSbF+TgaohRg1ncwNyuMFCzXqzFVNQBlGOHAOmOQSdmaBmo+igbj0TV5jCRPjc4bUjMK2NkKWKDoLTFmYvuBRFCME0VZmYvejm4lT69NoRohshk/f7e3p6qJ4AZVhdfgYA2t/RuCUhdcOUQGDZTK1n5dVrK5Cq64oEsaat8ihtYiy9OFcxAL2LiAY4NsyGp3ifCSs6e/ZvEzk++2dWRL4qhAtIbDjEigrHcQCCcD4qJDqVpP4MDigKaTIlWEmITE2QICnhPHNS0FJlPhBUmEBIgaTMhRWSDSsKKQZljqQVCAGEoiiFQ/+nQplrqiegZEGUl1zPW55vdeo76uydQfNRJd6uhbqqk0JTMLzLqOcaOth4T01dJ70zFmtC7ZCNzLUa/tl5yTBhi6GpUjoPDGRqPY8sBCy5RbBQutpJ43ECahr+m5e7dsbdhRXqjL6NDQimSmXKm5KMlN8Q8LmemdrhIvbNRcgvOmmqy4E2wihkfLXOWUnF9UHhU0Keu0r2DMIOzF0F922yI6Eb2sg97CjMpNrVjezr2rN3PqSIjpacV8LFTDOeSjlIEDUYz8+FepMu09nuZWrddVHFLeeC8gtHNBtaVc72ipQbX8reJVEWtA3Hwm0y1ZxpndqMJMTXmY4sQ9Og1U7PO9gLLMbXeV/fmN/5axYXSG67XkmaitNnx0Lz7D+JqCrMaIi8/Z4zN99z/O0ZpulgAATn5VuNG9e29EJrBOoNG0H5X/i28c98aYkWuD+63zMK+j0jhR4PqAQkvQlsKCna6i1aStj46qNsQZdFo5dSBYXCt64uIMeCVBKmTUG1Cks86rkvpUs5bzxD20H59CtPaRG9JOfJB9xxZaWYvmVtGUMDlmHoEB0EwU5w95VVL73Gu+qe9785cdCXfkH4au19R1bXl40RZBEomxbyeIoLcEIWrLv93mHu8KcnNhMjr5or3/ZT3pff+G1947u/VtAnB374+tzjzJNnPrv1znOt5vr3OOFo1ZpnmLMt3aPr6nfv7by0dPKZjRY9Yvy57bvXhoYfWTX0nHUh3vRh1Dk8WFBQtW+y2ls6Xl6rpMfPCOmB5O4VK/c0nPzx/N6PWE/RwceWLF98aOKBseFnT700+MXBpzW54tSph06f/ulsTfq2fakDe8YWD04mxw899Yk4xn7+1mi5r3Hk945WZfXr2weCDa9UnD3hvfDtm5d2H/3l6Mj9z7+4YT916PiiiRXHBqreWcYcOTbJj2xYHm3dPjh+1x9i8vz3w4PljRMNpZsubrMO/Ewu+rjz+P4nLsY/GM2G8S/SX328fRMAAA==',
      'Content-Type': 'application/json',
      'X-EBAY-C-MARKETPLACE-ID' : 'EBAY_US',
      'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=<ePNCampaignId>,affiliateReferenceId=<referenceId></referenceId>'
    }
  }
  // 
  fetch('https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=' +`${keywordString}`+'&limit=10', reqObj)
  .then(response => response.json())
  .then(result => {
    console.log('ebay response', result)
  }).catch(error => {
    console.log('there was an error', error)
  })

}
componentDidMount(){
  
  // this.requestToEbay('batman', '')
}
    render (){

      return (
        <div>
          <div>
            <SignIn handleSubmit={this.handleSubmitUser}user={this.state.user} />
          </div>
          <div>
            <AddOrUpdate addBook={this.addBook}state={this.state}submitUpdatedComic={this.submitUpdatedComic} />
          </div>
          <div classname='comicdisplay'>
            <h2>Here Are Your Comics:</h2>
            <ComicContainer comics={this.state.comics}updateComic={this.updateComic}deleteComic={this.deleteComic}/>
        </div>
      </div>
      )
    }

}

export default App;




