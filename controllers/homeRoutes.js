const router = require('express').Router();
//bringing in all models
const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    console.log("find all, route hit for home")
    try {
        const findPosts = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        })
        const posts = findPosts.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login-page');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    console.log("find single post, route hit for home")
    try {
        const postbyID = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        })
        const singlepost = await postbyID
        if (!singlepost) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        const post = singlepost.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn });


    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

router.get('/posts-comments', async (req, res) => {
    console.log("find posts' comments, route hit for home")
    try {
        const findComment = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
            ]
        })
        const findnewComment = await findComment
        if (!findnewComment) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        const post = findnewComment.get({ plain: true });

        res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;