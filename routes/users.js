var express = require('express');
var router = express.Router();
var passport   = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/dashboard');
});

/**
 * Route to register a user
 */
router.get('/signup', function(req, res, next) {
  res.render('register', { title: 'Sign Up' });
});
/**
 * Route to post new user to database
 */
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
}

));

/**
 * Login page display route
 */
router.get('/signin', function(req, res, next) {
  if(req.isAuthenticated())
    res.redirect('/dashboard');
  res.render('login', { title: 'Log In' });
 
 
});

/**
 * Post to sign in url
 */
router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/dashboard',

  failureRedirect: '/signin'
}

));
/**
 * Dashboard page for successfully logged in users
 */
router.get('/dashboard',isLoggedIn,function(req, res, next) {
  
  res.render('dashboard', {
    user : req.user // get the user out of session and pass to template
  });
});

/**
 * Route to log out user and clear session
 */
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
           res.redirect('/signin');
       });
});
/**
 * Route  to check is someone is logged in middleware
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isLoggedIn(req, res, next) {
  
     if (req.isAuthenticated())
      
         return next();
          
     res.redirect('/signin');
  
 }

module.exports = router;
