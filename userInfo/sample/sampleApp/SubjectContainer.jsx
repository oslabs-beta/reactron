import React, { Component } from 'react';
import SubjectCreator from '../components/SubjectCreator';
import ContentDisplay from '../components/ContentDisplay';


//  >>> SHOULD PASS PROPS TO SUBJECTS-DISPLAY <<<
class SubjectContainer extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      subjects: [],
    };
  }

  componentDidMount() {

    fetch(/* THIS WILL HAVE TO BE FROM THE BACKEND */)
      .then(res => res.json())
      .then(
        (value) => {
          // console.log(value);
          this.setState({
            isLoaded: true,
            urls: value,
            // urls: this.state.urls.push(value),
          });
        })
      .catch((error) => {
        console.log(console.error())
      }
      );
  }


  render() {
    const eachSubject = [];
    for (let i = 0; i < this.state.subjects.length; i++){
      eachSubject.push(
        <SubjectContainer 
          devSubject={this.state.subjects[i]} 
        />
      )
    }
    //Return 
    return (
      <div id='subject-container'>
        {eachSubject}
        <SubjectCreator />
        <ContentDisplay />
      </div>
    )
  }
}

// module.exports = SubjectContainer;
export default SubjectContainer;