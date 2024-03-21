const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: '762844457812-1b82t54vko975fjs1480eipvmfi2fhju.apps.googleusercontent.com',
    clientSecret:' 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',
    callbackURL: "http://localhost:5000/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
    }

    try{

        let user = await User.findOne({googleId: profile.id});
        if(user){
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }

    }catch(e){
        console.log(e);
    }

  }
));


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login-failure',
  successRedirect: '/dashboard'
 }),
);

router.get('/login-failure', (req, res) => {
    res.send('something went wrong..')
});

// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if(error) {
        console.log(error);
        res.send('Error loggin out');
      } else {
        res.redirect('/')
      }
    })
  });
  

// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

// Retrieve user data from session.
// Original Code

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = router;