const express = require('express');
const router = express.Router();
const guitarScraper = require('ultimate-guitar-scraper');
const Guitar = require('../models/guitar.js');
const session = require('express-session');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
// index route
router.get('/', (req, res) => {
	Guitar.find({}, (error, foundGuitar) => {
		res.json(foundGuitar);
	});
});

// create index route POST
router.post('/', (req, res) => {
	Guitar.create(req.body, (error, createdGuitar) => {
		res.json(createdGuitar);
	});
});

// delete route
router.delete('/:id', (req, res) => {
	Guitar.findByIdAndRemove(req.params.id, (error, deletedGuitar) => {
		res.json(deletedGuitar);
	});
});

// update route
router.put('/:id', (req, res) => {
	Guitar.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedGuitar) => {
		res.json(updatedGuitar);
	});
});

module.exports = router;
