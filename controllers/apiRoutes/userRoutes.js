const router = require('express').Router();
//bringin in all models
const { User, Post, Comment } = require('../../models');
const middleware = require('../../utils/authentication');

// get all users
router.get('/', (req, res) => {
    console.log("get all route hit for User")
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Get a single user
router.get('/:id', (req, res) => {
    console.log("get single route hit for User")
  User.findOne({
      attributes: { exclude: ['password'] },
      where: {
          id: req.params.id 
      },
      include: [{
        model: Post,
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ]
    },

    {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
            model: Post,
            attributes: ['title']
        }
    },
    {
        model: Post,
        attributes: ['title'],
    }
]
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// Create a new user
router.post('/signUp', (req, res) => {
    console.log("post route hit for User")
  User.create({
    username: req.body.username,
    password: req.body.password

  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id; 
        req.session.username = dbUserData.username;
        req.session.loggedIn = true; 

        res.json(dbUserData);

      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login route 
router.post('/login', (req, res) => {
    console.log("login route hit for User")
  console.log(req.body)
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that username!' });
      return;
    }
    console.log(dbUserData)
    var validPassword = dbUserData.passwordCheck(req.body.password);

    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return; 
    }

    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username; 
        req.session.loggedIn = true; 

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

// Logout Route
router.post('/logout', middleware, (req, res) => {
    console.log("logout route hit for User")
  if (req.session.loggedIn) {
     req.session.destroy(() => {
        res.status(204).end();
     });
  } else {
     res.status(404).end();
  }
});

// User Update 
router.put('/:id',middleware, (req, res) => {
    console.log("Update route hit for User")
    User.update(req.body, {
        individualHooks: true,
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

  // Delete User
  router.delete('/:id', middleware, (req, res) => {
    console.log("Delete route hit for User")
        User.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
      });

module.exports = router;