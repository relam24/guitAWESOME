const express = require('express');
const app = express();
const mongoose = require('mongoose');
const guitarScraper = require('ultimate-guitar-scraper');
const session = require('express-session');
const bcrypt = require('bcrypt');
const router = express.Router();

app.use(express.json());
app.use(express.static('public'));
app.use(session({
	secret: 'ukulele',
	resave: false,
	saveUninitialized: false
}));
// added controllers for users and session and create function for /app
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const guitarController = require('./controllers/guitar.js');
app.use('/guitar', guitarController);

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/guitAWESOME';
mongoose.connect(mongoURI);

mongoose.connection.once('open', () => {
	console.log('connection to mongod');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('listening');
});
