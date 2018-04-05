const mongoose = require('mongoose');
const guitarScraper = require('ultimate-guitar-scraper');

const guitarSchema = new mongoose.Schema({
	name: {type: String, require: true},
	artist: {type: String, require: true},
	url: String,
	tabUrl: {text: String, html: String},
	lyricUrl: String,
	learnedSong: {type: Boolean, default: false}
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
