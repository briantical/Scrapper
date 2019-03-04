import React, { Component } from 'react';
import './../../App.css';

class Scrapper extends Component {
  constructor(props){
    super(props)
    this.state={
      data : [],
      category: null
    }
  }

  componentDidMount(){   
    this.scrap();       
  }
  
  scrap = () =>{
    fetch('http://localhost:5000/movies') 
      .then(res => res.json())
      .then((data)=>{                
        this.setState({data: data[0]});
        this.setState({category: data[1]});
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
            <div className="filterCriteria">{`Criteria :${this.state.category}`}</div>
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

export default Scrapper;
