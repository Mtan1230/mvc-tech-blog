const { Comment } = require('../models');

const commentData = [
  {
    text: 'I just learned about this in my class!',
    user_id: 1,
    post_id: 1
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;