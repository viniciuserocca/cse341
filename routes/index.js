const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/authenticate');

router.use('/',
  //#swagger.tags=['Default']
  require('./swagger.js')
);

router.get('/',
  //#swagger.tags=['Default']
  (req, res) => {
    res.send('Hi there, use the /api-docs route');
  }
);

router.use('/auth',
  //#swagger.tags=['Auth']
  require('./auth.js')
);

router.get('/github/login',
  //#swagger.tags=['GitHub Auth']
  passport.authenticate('github')
);

router.get('/github/callback',
  //#swagger.tags=['GitHub Auth']
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.get('/logout',
  //#swagger.tags=['GitHub Auth']
  (req, res, next) => {
    req.logout(function (err) {
      if (err) return next(err);
      req.session.destroy(() => {
        res.redirect('/');
      });
    });
  }
);

router.use('/books',
  //#swagger.tags=['Books']
  isAuthenticated,
  require('./books.js')
);

router.use('/reviews',
  //#swagger.tags=['Reviews']
  isAuthenticated,
  require('./reviews.js')
);

module.exports = router;
