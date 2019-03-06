import React, { Component } from 'react';
//import TagCloud from 'react-tag-cloud';
//import randomColor from 'randomcolor';
//import CloudItem from './CloudItem';
import WordCloud from 'react-d3-cloud';
import './Cloud.css';

let  thedata = [
  { text: 'Briantical', value: 1000 },
  { text: 'Nodejs', value: 200 },
  { text: 'React ', value: 800 },
  { text: 'Express', value: 1000000 },
  { text: 'Brian Ivan', value: 1089 },
];

fetch('http://localhost:5000/tweets') 
      .then(res => res.json())
      .then((data)=>{  
        console.log(data)  
        thedata = data                                  
        console.log('Data successfully fetched...')      
      })
      .catch(error =>{        
        console.log('Error fetching data: ' + error);
      })

const fontSizeMapper = word => word.value / 20;
const rotate = word => (word.value % 90) - 45;

class Cloud extends Component {
  constructor(props){
    super(props)
    this.state={
      trends : []
    }
  }

  componentDidMount() {       
  }
  
  render() {   
    const newData = thedata.map(item => ({
      text: item.text,
      value: Math.random() * 1000
    }));
    return (
      <div className='app-outer'>
        <div className='app-inner'>
          <h1>#Trends</h1>
          <WordCloud
            width={window.innerWidth}
            height={window.innerHeight}
            data={newData}
            fontSizeMapper={fontSizeMapper}
            rotate={rotate}
          />
        </div>
      </div>
    );
  }
}

export default Cloud;
