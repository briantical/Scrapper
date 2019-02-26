import React, { Component } from 'react';
import Display from './Display'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      contentVisible : false
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">  
          {
            this.state.contentVisible ?  
            <Display/> :
            <button className="scrapBtn" onClick={()=>this.setState({contentVisible: true})}>
              SCRAP
            </button>
          }                            
        </header>
      </div>
    );
  }
}

export default App;
