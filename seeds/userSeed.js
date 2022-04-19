const { User } = require('../models');

const userData = [
    {
        username: 'Ali',
        password: '3ttw33dsdsad'

    },
    {
        username: 'Alex',
        password: 'jjjkk2233k'
    },
    {
        username: 'Ramy',
        password: '125Sauga'
    },
    {
        username: 'Riri',
        password: 'moNey'
    },
    {
        username: 'Drake',
        password: '422WesTon'
    },
    {
        username: 'Dusty',
        password: 'Ronaldo'
    },
    
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;