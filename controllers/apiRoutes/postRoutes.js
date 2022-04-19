const router = require('express').Router();
//bringing in all models
const { User, Post, Comment } = require('../../models');
//middleware
const middleware = require('../../utils/authentication');

// get all posts
router.get('/', (req, res) => {
    console.log("get all route hit for posts")
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        order: [
            ['created_at', 'DESC']
        ],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single Post
router.get('/:id', (req, res) => {
    console.log("get single route hit for posts")
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id',
            'content',
            'title',
            'created_at'
        ],

        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new Post
router.post('/create', middleware, (req, res) => {
    console.log("post route hit for posts")
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post Update 
router.put('/:id', middleware, (req, res) => {
    console.log("put route hit for posts")
    Post.update({
        title: req.body.title,
        content: req.body.content,
    }, 
        {
         where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData[0]) {
                res.status(404).json({ message: 'No Post found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete Post
router.delete('/:id', middleware, (req, res) => {
    console.log("Delete route hit for posts")
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No Post found' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;