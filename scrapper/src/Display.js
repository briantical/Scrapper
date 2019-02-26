import React, { Component } from 'react';
import './App.css';

const categories = {    
  1: 'alpha',
  2: 'user_rating',
  3: 'num_votes',
  4: 'boxoffice_gross_us',
  5: 'year'
}


class Display extends Component {
  constructor(props){
    super(props)
    this.state={
      data : []
    }
  }

  componentDidMount(){   
    this.scrap();       
  }
  
  
//Generate Random numbers between any two values them inclusive
getRandomInt = (min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  scrap = () =>{
    fetch('http://localhost:5000/movies')
      .then(res => res.json())
      .then((data)=>{                
        this.setState({data: data});
        console.log('Data successfully fetched...')      
      })
      .catch(error =>{
        console.log('Error fetching data: ' + error);
      })
  }

  render() {       
    return (
      <div className="App">
        <header className="displayContainer">
            <div className="filterCriteria">{`Criteria :${categories[getRandomInt(1,5)]}`}</div>
            <table cellSpacing={20}>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Title</th>
                        <th>Premiere</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    this.state.data.map((movie, index) =>
                      (<tr key={index}>
                        <td>{movie.rank}</td>
                        <td>{movie.movie}</td>
                        <td>{movie.year}</td>
                        <td>{movie.rating}</td>
                    </tr>)
                    )
                  }                    
                </tbody>                
            </table> 
            <div className="theFooter">
               {`Built using ReactJS(FrontEnd) and NodeJS(ExpressJS as the BackEnd Server). Briantical`}
            </div>        
        </header>               
      </div>
    );
  }
}

export default Display;
