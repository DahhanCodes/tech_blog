const router = require('express').Router();
//bringing in all models
const { User, Post, Comment } = require('../models');
//middleware
const middleware = require('../utils/authentication');


router.get('/', middleware, async (req, res) => {
    console.log("find all, route hit for dashboard")
    try{
        const dashBoard = await Post.findAll({
                where: {
                    user_id: req.session.user_id
                },
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
                const createDBoard = await dashBoard
                const posts = createDBoard.map(post => post.get({ plain: true }));
                res.render('Dashboard', { posts, loggedIn: true });
            }
    
            catch(err) {
                console.log(err);
                res.status(500).json(err);
            };
    });
    
    router.get('/update/:id', middleware, async (req, res) => {
        console.log("update route hit for dashboard")
        try{
        const updatePost = await Post.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id',
                    'title',
                    'content',
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
                const updated = await updatePost
                if (!updated) {
                    res.status(404).json({ message: 'No post found' });
                    return;
                }
    
                const post = updated.get({ plain: true });
                res.render('edit-post', { post, loggedIn: true });
            }
    
            catch(err) {
                console.log(err);
                res.status(500).json(err);
            };
    })
    router.get('/new', (req, res) => {
        console.log("render new, route hit for dashboard")
        res.render('new-post');
    });
    
    
    
    module.exports = router;