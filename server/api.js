const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});


const router = express.Router();

router.post('/register', (req, res) => {
	let user = new User();

	user.name = req.body.name;
	user.email = req.body.email;

	user.setPassword(req.body.password);

	user.save(function(err) {
		let token= user.generateJwt();
		res.status(200);
		res.json({
			'token': token
		});
	});
});

router.post('/login', (req, res) => {
	passport.authenticate('local', function(err, user, info) {
		var token;

		//if passport throws/catches an error
		if(err) {
			res.status(404).json(err);
			return;
		}

		//if a user is found
		if(user){
			token = user.generateJwt();
			res.status(200);
			res.json({
				'token': token
			});
		} else {
			//if user is not found
			res.status(401).json(info);
		}
	})(req,res);
});

router.get('/home', auth, (req, res) => {
	if(!req.payload._id){
		res.status(401).json({
			"message": "UnauthorizedError: private profile"
		});
	} else {
		User.findById(req.payload._id, function(err, user){
			res.status(200).json(user);
		});
	}
});

router.get('/profile/:id', (req,res) => {
	User.findById(req.params.id, function(err, user){
		if(err){
			console.log(err);
		} else {
			res.status(200).json(user);
		}
	});
})

router.post('/post', auth, (req, res) => {
	console.log(req.payload._id);
	if(!req.payload._id){
		res.status(401).json({
			"message": "UnathorizedError: must be signed in to post"
		});
	} else {
		let post = new Post();
		console.log(req);
		post.title = req.body.title;
		post.content = req.body.content;
		post.author = req.payload._id;
		post.save(function(err) {
			if(err){
				console.log(err);
			} else{
				res.status(200).json(post);
			}
		})
	}
});

router.get('/posts/:id', (req, res) => {
	Post.find({author: req.params.id}, function(err, posts){
		if(err){
			console.log(err)
		} else{
			res.json(posts);
		}
	});
});








module.exports = router;

