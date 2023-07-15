const router = require('express').Router();
const { Post, Comment } = require('../../models');

router.post('/:id', async (req, res) => {
	if (!req.session.loggedIn) {
		res.redirect('/login');
	} else {
		try {
			const postData = await Post.findByPk(req.params.id);
			console.log({
				text: req.body.text,
				user_id: req.session.userId,
				post_id: req.params.id
			});
			if (postData) {
				const commentData = Comment.create({
					text: req.body.message,
					user_id: req.session.userId,
					post_id: parseInt(req.params.id)
				})
				res.status(200).json(commentData);
			}
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	}
})

module.exports = router;
