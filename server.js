const express = require('express');
const app = express();
const mongoose = require('mongoose');
const guitarScraper = require('ultimate-guitar-scraper');

app.use(express.json());
app.use(express.static('public'));

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
