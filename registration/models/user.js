const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  fname:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  // username:{
  //   type: String,
  //   required: true
  // },
  contact:{
    type: Number,
    required: true
  },
  lname:{
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
