const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
