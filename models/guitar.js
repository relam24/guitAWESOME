const mongoose = require('mongoose');
const guitarScraper =require('ultimate-guitar-scraper');
const User = require('../models/users.js');
const Schema = mongoose.Schema;

const guitarSchema = new Schema({
	name: String,
	artist: String,
	url: String,
	tabUrl: String,
	lyricUrl: String,
	learnedSong: {type: Boolean, default: false},
});

const Guitar = mongoose.model('Guitar', guitarSchema);

module.exports = Guitar;
