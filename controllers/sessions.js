const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
//post new session
router.post('/', (req, res) => {
	User.findOne({
		username: req.body.username
	}, (err, user) => {
		if (user === null || undefined) {
			res.send('invalid username');
		} else {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.currentuser = user;
				res.json('index.html');
			} else {
				res.send('wrong password');
			}
		}
	});
});
//logout session
router.delete('/', (req, res) => {
	req.session.destroy(() => {
		res.status(200).json({
			status: 200,
			message: 'logout complete'
		});
	});
});

module.exports = router;
