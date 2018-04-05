const mongoose = require('mongoose');
const guitarScraper = require('ultimate-guitar-scraper');

const guitarSchema = new mongoose.Schema({
	name: {type: String, required: true},
	artist: {type: String, required: true},
	url: {type: String, required: true},
	tabUrl: {type: String, required: true},
	lyricUrl: {type: String, required: true},
	learnedSong: {type: Boolean, default: false, required: true}
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
