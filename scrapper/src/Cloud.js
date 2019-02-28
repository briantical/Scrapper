import React, { Component } from 'react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import './App.css';

class Cloud extends Component {
  constructor(props){
    super(props)
    this.state={
      trends : []
    }
  }

  componentDidMount(){   
    //this.scrap();       
  }
  
  render() {       
    return (
      <div className="App">
        <header className="displayContainer">            
            <div className="cloudCover">
            <TagCloud 
                style={{
                fontFamily: 'sans-serif',
                fontSize: 30,
                fontWeight: 'bold',
                fontStyle: 'italic',
                color: () => randomColor(),
                padding: 5,
                width: '100%',
                height: '100%'
                }}>
                <div style={{fontSize: 50}}>react</div>
                <div style={{color: 'green'}}>tag</div>
                <div rotate={90}>cloud</div>            
            </TagCloud>
            </div>
            <div className="theFooter">
               {`Built using ReactJS(FrontEnd) and NodeJS(ExpressJS as the BackEnd Server). Briantical`}
            </div>        
        </header>               
      </div>
    );
  }
}

export default Cloud;
