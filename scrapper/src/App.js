import React, { Component } from 'react';
import Display from './Display'
import Cloud from './Cloud'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      visibleScreen : null,
      contentVisible : false
    }
  }

  setVisibleScreen = (screen) =>{
    this.setState({visibleScreen: screen});
    this.setState({contentVisible: true});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">          
          {
            this.state.contentVisible ?  
            this.state.visibleScreen === 1 ? <Display/> :<Cloud/> :
            <div className="btnCollections">
            <p>CLICK ON BUTTON FOR DESIRED ACTION</p>
              <button className="scrapBtn" onClick={()=>this.setVisibleScreen(1)}>
                SCRAP
              </button>
              <button className="scrapBtn" onClick={()=>this.setVisibleScreen(2)}>
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
