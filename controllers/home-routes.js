const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ['username'],
				},
			],
		});

		const posts = postData.map((post) =>
			post.get({ plain: true })
		);
		res.render('homepage', {
			posts,
			loggedIn: req.session.loggedIn,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.get('/post/:id', async (req, res) => {
	// If the user is not logged in, redirect the user to the login page
	if (!req.session.loggedIn) {
		res.redirect('/login');
	} else {
		try {
			const postData = await Post.findByPk(req.params.id, {
				include: [
					{
						model: User,
						attributes: ['username'],
					},
					{
						model: Comment,
						include: [
							{
								model: User,
								attributes: ['username'],
							}
						]
					}
				],
			});
			const post = postData.get({ plain: true });
			res.render('post', { post, loggedIn: req.session.loggedIn });
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
});

router.get('/dashboard', async (req, res) => {
	// If the user is not logged in, redirect the user to the login page
	if (!req.session.loggedIn) {
		res.redirect('/login');
	} else {
		// If the user is logged in,

		res.render('dashboard');

	}
});

router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}

	res.render('login');
});


module.exports = router;