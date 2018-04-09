const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Schema = mongoose.Schema;

const guitarSchema = new Schema({
	name: String,
	artist: String,
	url: String,
	tabUrl: String,
	lyricUrl: String,
	learnedSong: {type: Boolean, default: false},
});

const userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	songs: [guitarSchema]
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
