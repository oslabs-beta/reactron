import React, { Component } from 'react';
import { render } from 'react-dom';


// APP CLASS - PROVIDES THE PAGE WITH FUNCTIONALITY
class App extends Component {
  constructor(){
    super();
  }

  render() {
    
    console.log(this)

    return (
      <div>
        <h1>Tic Tac Toe</h1>
        {<Board />}
      </div>
    );
  }
}




class Board extends Component {

  constructor(){
    super();
    this.state = {
      0 : ['-','-','-'],
      1 : ['-','-','-'],
      2 : ['-','-','-']
    }
  }

  render(){
    console.log(this)
    const board = [];
    for (let i = 0; i < 3; i++){
      board.push(
        <Row 
        
        position = {this.state[i]}
        rowIdx = {i}
        
        />
      )
    }
    return(
          <div className="board"> {board} </div>
    )
  }
}




// ROW CLASS - INSTANTIATES 3 BOXES IN A VERTICLE AXIS
class Row extends Component {
  constructor(){
    super();
    this.state = {
      keys : ['-','-','-']
      
    }
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(index){
    if(this.state.keys[index]==='X' || this.state.keys[index] === '-'){
      const newState = this.state.keys;
      newState[index] = 'O'
      this.setState(newState)
    }
    else if(this.state.keys[index]==='O') {
      const newState = this.state.keys;
      newState[index] = 'X'
      this.setState(newState)
    }
  }
  
  render(){
    console.log(this)
    const row = [];
    
    for (let i =0;  i< this.state.keys.length; i++){
      row.push(
        <Box 
        changeValue = {this.changeValue}
        letter = {this.state.keys[i]}
        idx = {i}
        />
        )
      }
      return(
        <div className = "rows">
              {row}
            </div>
    )
  }
}




// BOX CLASS - CURRENTLY NOT USED
class Box extends Component {
  constructor(){
    super();
  }
  
  render(){
   console.log(this)
    return(
      <button onClick={() => {this.props.changeValue(this.props["idx"])}} className="box">
        <p className = "letter">{this.props.letter}</p>
      </button>
    )
  }
}




render(<App />, document.querySelector('#root'));






















/*
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cohortNumbers: [1]
    }
    this.handleClick = this.handleClick.bind(this); //bind the handleClick method to each App instance.
    this.handleDelete = this.handleDelete.bind(this);
  }
    
  handleClick() {
    const newCohortNumbers = this.state.cohortNumbers.map(num => 25);
    this.setState({cohortNumbers: newCohortNumbers}); //you must use the setState method - the cohortNumbers property on the state now will be newCohortNumbers (object represents new state) 
  }

  handleDelete(event) {
    this.setState({cohortNumbers: []})
  }

  render() {
    const boxes = [];
    for (let i = 0; i < this.state.cohortNumbers.length; i++) {
      boxes.push(<Box 
                  handleClick={this.handleClick} 
                  handleDelete={this.handleDelete}
                  number={this.state.cohortNumbers[i]}
                  key={i}
                />); //pass this class's handleClick method into Box.props
    }
    return(
      <section>
        {boxes}
      </section>
    );
  }
}



class Box extends React.Component {

  constructor() {
    super();
    this.state = {
      phrase: 'react is so coooooool'
    }
    console.log('constructor just fired!');
  }

  componentDidMount() {
    console.log("componentDidMount fired!")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate fired!")
  }

  componentWillUnmount() {
    console.log('componentWillUnmount fired!')
  }

  render() {
    console.log("render fired!");
    return (
      <div>
        <p>Cohort {this.props.number} is awesome!</p>
        <button onClick={this.props.handleClick}>Click Me</button>
        <button onClick={this.props.handleDelete}>Delete</button>
      </div>
    )
  }
}
*/