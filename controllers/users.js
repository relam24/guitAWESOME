const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
	User.find({}, (err, foundUsers) => {
		res.json(foundUsers);
	});
});

router.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	User.create(req.body, (err, createdUser) => {
		// req.session.currentuser = createdUser;
		// req.session.curentpassword = createdUser;
		if (err) {
			res.send('Please choose another username');
		} else {
		res.status(201).json({
			status: 201,
			message: 'User Created'
		})
		};
	});
});

module.exports = router;
