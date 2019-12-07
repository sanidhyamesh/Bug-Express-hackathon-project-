const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
var Fakerator = require("fakerator");
var fakerator = Fakerator("de-DE");

// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

// Register Proccess
router.post('/register', function(req, res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const contact = req.body.contact;
  

  req.checkBody('fname', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('contact', 'Mobile no is required').notEmpty();
  req.checkBody('lname', 'Last name is required').notEmpty();
  

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      fname:fname,
      email:email,
      contact:contact,
      lname:lname
    });

    var username =fakerator.internet.userName(fname,lname);
    console.log(username);



    // bcrypt.genSalt(10, function(err, salt){
    //   bcrypt.hash(newUser.password, salt, function(err, hash){
    //     if(err){
    //       console.log(err);
    //     }
    //     newUser.password = hash;
    //     newUser.save(function(err){
    //       if(err){
    //         console.log(err);
    //         return;
    //       } else {
    //         req.flash('success','You are now registered and can log in');
    //         res.redirect('/users/login');
    //       }
    //     });
    //   });
    // });






  }
});

// Login Form
// router.get('/login', function(req, res){
//   res.render('login');
// });

// // Login Process
// router.post('/login', function(req, res, next){
//   passport.authenticate('local', {
//     successRedirect:'/',
//     failureRedirect:'/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // logout
// router.get('/logout', function(req, res){
//   req.logout();
//   req.flash('success', 'You are logged out');
//   res.redirect('/users/login');
// });

module.exports = router;
