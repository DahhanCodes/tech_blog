const router = require('express').Router();
//bringing in all models
const { User, Post, Comment } = require('../../models');
//middleware
const middleware = require('../../utils/authentication');

// get all Comment
router.get('/', (req, res) => {
    console.log("get all route hit for Comment")
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
        ],
      
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get a single Comment
router.get('/:id', (req, res) => {
    console.log("get single route hit for Comment")
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
        'comment_text'
        ],

        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Post,
            attributes: ['id', 'title', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'Comment not found' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new Comment
router.post('/create', middleware, (req, res) => {
    console.log("Post route hit for Comment")
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Comment Update 
router.put('/:id', middleware, (req, res) => {
    console.log("put route hit for Comment")
    Comment.update({
        comment_text: req.body.comment_text
    }, 
        {
         where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData[0]) {
                res.status(404).json({ message: 'No Comment found' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete Comment
router.delete('/:id', middleware, (req, res) => {
    console.log("Delete route hit for Comment")
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No Comment found' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;