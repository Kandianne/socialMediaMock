var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; //It's requiring the passport for our local database authentication.
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(function(username, password, done) { //This password is called from password.authenticate, from user routes.
  User.findOne({username: username}) //find the username in the model from where it's being called. 
  .exec(function(err, user) {  
  	if(err) return res.status(500).send({err: "Server has issues."});
  	if(!user) return res.status(400).send({err: "User does not exist"});
  	if(!user.checkPassword(password)) return res.status(400).send({err: "Invalid username and password combination."});
  	return done(null, user);
  });
}));