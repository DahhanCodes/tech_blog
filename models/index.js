// import models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

///////////////////////////
///setting up associations///
///////////////////////////

// User have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id',
   
});


// Post belong to User
Post.belongsTo(User, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//comments belong to users
Comment.belongsTo(User, {

    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Posts have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// User have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//comments belong to users and posts

Comment.belongsTo(Post, {

    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});



module.exports = {
    User,
    Post,
    Comment,
};
