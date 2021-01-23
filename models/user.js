const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 140,
        required: true
      },
  email: {
    type: String,
    minlength: 5,
    required: true,
    trim: true,
    lowercase: true
  },
  passwordHashAndSalt: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;