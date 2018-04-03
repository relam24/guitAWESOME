const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const session = require('express-session');

router.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		if (bcrypt.compareSync(req.body.password, foundUser.password)) {
			req.session.currentuser = foundUser;
			res.status(201).json({
				status: 201,
				message: 'Session Created'
			});
		} else {
			res.status(401).json({
				status: 401,
				message: 'login failed'
			});
		}
	});
});

router.delete('/', (req, res) => {
    req.session.destroy( ()=>{
        res.status(200).json({
            status:200,
            message:'logout complete'
        });
    });
})

module.exports = router;
