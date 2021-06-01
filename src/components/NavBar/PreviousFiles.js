import React from 'react';
import axios from 'axios';

export default class PreviousFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevFiles: [],
    };
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handlePrevious(name) {
    console.log(name);
  }

  componentDidMount() {
    axios
      .post('/fs/prevprojs', { username: this.props.username })
      .then((res) => this.setState({ prevFiles: res.data }));
  }

  render() {
    const returnArr = [];
    for (let i = 0; i < this.state.prevFiles.length; i += 1) {
      returnArr.push(
        <button onClick={() => this.handlePrevious(this.state.prevFiles[i])}>
          {this.state.prevFiles[i]}
        </button>
      );
    }
    return (
      <div className='PreviousFiles'>
        Previous Projects
        <br />
        {this.state.prevFiles.length > 0
          ? returnArr
          : 'No projects yet! Create one to get started.'}
      </div>
    );
  }
}
