import React, { Component } from 'react';
import Display from './components/scrapper/Scrapper'
import Cloud from './components/cloud/Cloud'
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
            <div className="screen">
              <p>CLICK ON BUTTON FOR DESIRED ACTION</p>
              <div>
                  <button className="scrapBtn" onClick={()=>this.setVisibleScreen(1)}>
                    SCRAP
                  </button>
                  <button className="scrapBtn" onClick={()=>this.setVisibleScreen(2)}>
                    CLOUD
                  </button>
              </div>              
            </div>            
          }                            
        </header>
      </div>
    );
  }
}

export default App;
