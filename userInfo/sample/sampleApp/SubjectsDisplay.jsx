import React, { Component } from 'react';
import SubjectBubbles from '../components/SubjectBubbles';


//  >>> SHOULD FETCH & DISPLAY ALL AVAILABLE SUBJECTS  <<<
//  >>> SHOULD ALLOW FOR THE CREATION OF A NEW SUBJECT  <<<
class SubjectsDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchedSubj: false,
      subjects: [],
    };
  };


  componentDidMount() {
    fetch('/api/subName')
      .then(res => res.json())
      .then((subjects) => {
        if (!Array.isArray(subjects)) subjects = [];
        return this.setState({
          subjects,
          fetchedSubj: true
        });
      })
      .catch(err => console.log('SubjectsDisplay.componentDidMount: get subject names: ERROR: ', err));
  }


  render(){
    if (!this.state.fetchedSubj) return (
      <div>
        <h3>Subject Starter Guide</h3>
        <h3>Loading data, please wait...</h3>
      </div>
    );
    const { subjects } = this.state;
    if (!subjects) return null;
    if (!subjects.length) return (
      <div>Sorry, no subjects found. Go ahead and start a new one!</div>
    );


    const subNames = subjects.map((sub, i) => {
      return (
        <SubjectBubbles
          key={i}
          info={sub}
        />
      );
    });


    return(
      <div id='subject-display'>
        <h3>Select Dev Subjects</h3>
        <div className="subNameContainer">
        {subNames}
        </div>
      </div>
    )
  }
}




// module.exports = SubjectsDisplay;
export default SubjectsDisplay;