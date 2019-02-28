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
            <div>
              <button className="scrapBtn" onClick={()=>this.setState({contentVisible: true})}>
                SCRAP
              </button>
              <button className="scrapBtn" onClick={()=>this.setState({contentVisible: true})}>
                CLOUD
              </button>
            </div>            
          }                            
        </header>
      </div>
    );
  }
}

export default App;
