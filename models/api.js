const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
	artist: String,
	name: String,
	url: String,
	type: String
});

const API = mongoose.model('API', apiSchema);

module.exports = API;
