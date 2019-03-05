var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//create schema for the trend
var trendSchema = mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	}
});

var trends = (module.exports = mongoose.model("Trend", trendSchema));


//add a trend
module.exports.addTrend = function(trend, callback) {
	trends.create(trend, callback);
};
//remove all trends
module.exports.removeAllTrends = function(callback,limit){
	console.log('Removing all twitter content ...')
	trends.deleteMany({}, callback)
	console.log('Successfully removed all twitter content')
}
//get all the trends
module.exports.getTrends = function(callback, limit) {
	trends.find(callback).limit(limit);
};

