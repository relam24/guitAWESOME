const mongoose = require('mongoose');
const guitarScraper = require('ultimate-guitar-scraper');

const guitarSchema = new mongoose.Schema({
	name: String,
	artist: String,
	url: String,
	tabUrl: String,
	lyricUrl: String,
	learnedSong: {type: Boolean, default: false},
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
