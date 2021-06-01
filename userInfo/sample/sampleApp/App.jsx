import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';


class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id='app-div'>
               <MainContainer />
            </div>
        );
    }
};


export default App;