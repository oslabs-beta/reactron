import React, { Component } from 'react';
import SubjectContainer from './SubjectContainer';
import SubjectsDisplay from '../components/SubjectsDisplay';

//  >>> SHOULD FETCH & PASS PROPS TO SUBJECTS-DISPLAY <<<
class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div id='main-container'>
        <h3>Before you get Kerri'd away...</h3>
        <SubjectsDisplay />
        <SubjectContainer />
      </div>
    )
  }

}


// module.exports = MainContainer;
export default MainContainer;