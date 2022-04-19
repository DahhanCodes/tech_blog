const { Post } = require('../models');

const postData = [
    {
        title: 'Dusty Locane, the upcoming popSmoke',
        content: 'Locane has a great voice, a reminiscence of Pop Smoke ',
        user_id: 1

    },
    {
        title: 'Covid and Home Life',
        content: 'How long will we have to live our lives from home',
        user_id: 2
    },
    
];

const seedUsers = () => Post.bulkCreate(postData);

module.exports = seedUsers;