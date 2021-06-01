import React, { Component } from 'react';


class DevSubject extends Component {
  constructor(props){
    super(props);
    // this.state = {
    //   newDiv: 
    // }
    // this.appendData = this.appendData.bind(this);
  }


//   appendData() {
//     this.state.newDiv.push(<div  id="display-data"><pre>{this.state.postVal}</pre></div>);
//  }

  render(){
    const { name } = this.props.info;
    const { dev_type } = this.props.info;
    const { instructions } = this.props.info;
    return (
      <article className="card charCard">
        <div className="subHeadContainer">
          <h3 className="subName">{name}</h3>
        </div>
        <ul className="subDetailsList">
          <li className="subDetail">Dev Type: {dev_type}</li>
          <li className="subDetail">Instructions: {instructions}</li>
        </ul>
        <button type="button" className="btnMain"><h6>+</h6></button>
      </article>
    );
  }
}


export default DevSubject;
