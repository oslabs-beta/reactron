import React, { Component } from 'react';
import DevSubject from './DevSubject';


//  >>> SHOULD FETCH & DISPLAY ALL AVAILABLE SUBJECTS  <<<
//  >>> SHOULD ALLOW FOR THE CREATION OF A NEW SUBJECT  <<<
class ContentDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchedSubj: false,
      subjects: [],
    };
  };

  componentDidMount() {
    fetch('/api/devSubject')
      .then(res => res.json())
      .then((subjects) => {
        if (!Array.isArray(subjects)) subjects = [];
        return this.setState({
          subjects,
          fetchedSubj: true
        });
      })
      .catch(err => console.log('ContentDisplay.componentDidMount: get subject content: ERROR: ', err));
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

    const subElems = subjects.map((sub, i) => {
      return (
        <DevSubject
          key={i}
          info={sub}
        />
      );
    });

    return(
      <div id='content-display'>
        <h3 id='starter-guide-header'>Subject Starter Guide</h3>
        <div className="subContainer">
          {subElems}
        </div>
      </div>
    )
  }
}

// module.exports = ContentDisplay;
export default ContentDisplay;