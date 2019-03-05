const express = require('express')
const $ = require('cheerio');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const Twitter = require('twitter');
const Twitter = require('twitter-js-client').Twitter;
const server = express();
require('dotenv').load();

const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;

let config = {
    "consumerKey": process.env.TWITTER_CONSUMER_KEY,
    "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
    "accessToken": process.env.TWITTER_ACCESS_TOKEN_KEY,
    "accessTokenSecret": process.env.TWITTER_ACCESS_TOKEN_SECRET,
    
  };

let client = new Twitter(config);  

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//Include CORS security feature in server
server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

Movie = require('./models/movies');
Trend = require('./models/trends');
mongoose.set('useFindAnd Modify', false);
mongoose.connect("mongodb://localhost:27017/scrapper",
    {useNewUrlParser: true}
);
let db = mongoose.connection;

//Twitter Callback function on failure
let error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};

//Twitter Callback function on success
let success = function (data) { 

    Trend.removeAllTrends((err) => {
        if (err) {
            console.log(`An error has occurred while removing the twitter data: \n ERROR: ${err}`);
            throw err;
        }else{
            console.log('Removed all twitter data')
        }                  
    })

    var str = data;    
    let trends = str.match(/#\w+/g);
    let trendsRate = [...new Set(trends.map(text => text))].map(value => ({ text: value, value: (trends.filter(text => text === value).length)*100}));

    trendsRate.map((trendRate , index) => {              
        Trend.addTrend(trendRate, (error, trendRate) =>{
            if(error){
                console.log('Error: ' + error);
                throw err;
            }                                
        })        
    })
    console.log(`Twiitter data entered successfully`)
     
};
client.getHomeTimeline({ count: '10000', tweet_mode: 'extended'}, error, success);

//Generate Random numbers between any two values them inclusive
let getRandomInt = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//The movies categories to be fetched.
const categories = {    
    1: 'alpha',
    2: 'user_rating',
    3: 'num_votes',
    4: 'boxoffice_gross_us',
    5: 'year'
}

let category = categories[getRandomInt(1,5)]
//The final link generated.
let dynamicUrl = `https://www.imdb.com/search/title?groups=top_250&view=simple&sort=${category},asc&start=${getRandomInt(1,250)}&ref_=adv_nxt`
console.log(`The URL TO SCRAP: ${dynamicUrl}`)
 
//Use puppeteer to get webpages with dynamically loaded data.
//Before adding any new movies remove all preexisting contents from the MongoDB database
Movie.removeAllMovies((err) => {
    if (err) {
        console.log(`An error has occurred while removing the Data: \n ERROR: ${err}`);
        throw err;
    }            
    console.log('DB cleaned sucessfully')
})
puppeteer
    .launch()
    .then((browser) => {
    return browser.newPage();
    })
    .then((page) =>{
    return page.goto(dynamicUrl, {
        waitUntil: 'networkidle2',
        timeout: 0
    }).then(() =>{
        return page.content();
    });
    })
    .then((html)=> {
        const lists = [];
        //Movie Rank
        $('.lister-item-index', html).each(function(i, elem){
            lists[i] = {"rank" : parseInt($(this).text().replace('.',''))}        
        })    
        //Movie Title  
        $('.col-title', html).children('span').find('a').each(function(i,elem){
            lists[i].movie = $(this).text();        
        })
        //Movie Release Year
        $('.lister-item-year', html).each(function(i, elem){
            lists[i].year = $(this).text();     
        })
        
        //Movie Rating 
        $('.col-imdb-rating', html).children('strong').each(function(i, elem){        
            lists[i].rating = parseFloat($(this).text().trim());       
        })                  
        lists.map((list , index) => {              
            Movie.addMovie(list, (err, list) =>{
                if(err){
                    console.log('Error: ' + err);
                    throw err;
                }                                  
            })
        })
        console.log('Movies successfully added to DB')
    })
    .catch((err) => {
    //handle error
        console.log('Error while obtaining data!!!: ' + err)
    });    

server.get('/', (req,res) =>{
    res.send('Welcome To SCRAPPER');
})                      

server.get("/movies", (req, res) => {
	Movie.getMovies((err, movies) => {
		if (err) {
            console.log(err);            
			throw err;
        }        
        res.json([movies,category]);    
        console.log('Api request sucessfully')
	});
});

server.get("/tweets", (req, res) => {
	Trend.getTrends((err, trends) => {
		if (err) {
            console.log(err);            
			throw err;
        }        
        res.json(trends);    
        console.log('Twitter request from DB sucessfully')
	});
});
  
//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});