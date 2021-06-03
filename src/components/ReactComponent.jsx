import React, { useEffect } from 'react';
import axios from 'axios';

// export default function ReactComponent() {
//   useEffect(() => {

//   }, []);

// }

export default class ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: [],
    };
  }

  componentDidMount() {
    const arr = [
      <iframe src='http://localhost:3000/secret' id='test'></iframe>,
    ];
    this.setState({ component: arr });
  }

  componentDidUpdate() {
    const iframe = document.getElementById('test');
    iframe.src = iframe.src;
  }

  render() {
    const arr = [];
    for (let i = 0; i < this.state.component.length; i += 1) {
      arr.push(this.state.component[i]);
    }
    return <div className='reactComponent'>{arr}</div>;
  }
}
