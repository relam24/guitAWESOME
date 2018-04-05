const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// all users
router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.json(foundUsers);
	});
});

// one user by id
router.get('/:id', (req, res) => {
	User.findById(req.params.id, (err, UserById) => {
		if (err) {
			res.send('User not found');
		} else {
			res.json(UserById);
		}
	});
});

// create user
router.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, (err, createdUser) => {
		if (err) {
			res.send('Please choose another username');
		} else {
			req.session.currentuser = createdUser;
			res.status(201).json({
				status: 201,
				message: 'User Created'
			});
		};
	});
});

module.exports = router;
