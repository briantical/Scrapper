var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//create schema for the movie
var movieSchema = mongoose.Schema({
	rank: {
		type: String,
		required: true
	},
	movie: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	rating: {
		type: String,
		required: true
	}
});

var movies = (module.exports = mongoose.model("Movie", movieSchema));

//add a movie
module.exports.addMovie = function(movie, callback) {
	movies.create(movie, callback);
};
//remove all movies
module.exports.removeAll = function(callback,limit){
	console.log('Removing all content ...')
	movies.remove({})
	console.log('Successfully removed all historical data')
}
//get all the movies
module.exports.getMovies = function(callback, limit) {
	movies.find(callback).limit(limit);
};

//get a movie by Rating
module.exports.getMovieByRating = function(rating, callback) {
	movies.findById(rating, callback);
};

//get a movie by Rank
module.exports.getMovieByRank = function(rank, callback) {
	movies.findOne({ rank: rank }, { checkins: 1, _id: 0 }, callback);
};
