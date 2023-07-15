const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id);

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
})

module.exports = router;
