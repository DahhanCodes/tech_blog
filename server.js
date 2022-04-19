//requiring all packages needed for server opertaion
const path = require('path');
const express = require('express');
const session = require('express-session');



//bringing in routes an DB
const routes = require('./controllers');
const sequelize = require('./config/dbConnection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//requiring exp-handlebars and helpers
const expHB = require('express-handlebars');
const helpers = require('./utils/helpers');

//starting server port
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'shhhh let it be',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

  app.use(session(sess));

  const hbs = expHB.create({ helpers });

  //telling the servere that we will be using handlebars as our visual engine
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(routes);

  sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log('Now Listening'));
  });