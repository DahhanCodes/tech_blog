const { Comment } = require('../models/');

const commentData = [{
        comment_text: "I agree",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "The closest we'll ever get to Pop",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "I want to go to Miami",
        user_id: 3,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;