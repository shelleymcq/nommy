// BRING IN MONGOOSE SCHEMA AND MODEL MODULES AND BCRYPT
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// USER SCHEMA
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // REGEX FOR EMAIL
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  avatar: {
    type: String,
  },
  zipcode: {
    type: String,
    // REGEX FOR ZIPCODE
    match: [/^[0-9]{5}(?:-[0-9]{4})?$/, 'Must match a zipcode!']
  },
  lastSearch: {
    type: String,
  },
  // FRIENDS IS AN ARRAY OF DATA ADHERING TO USER SCHEMA
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // SLATES IS AN ARRAY OF DATA ADHERING TO SLATE SCHEMA
  slates: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Slate',
    },
  ]
});

// HASH USER PASSWORD BEFORE SAVING A NEW USER TO DB
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// CUSTOM METHOD TO COMPARE AND VALIDATE INPUT PASSWORD AGAINST DB PASSWORD AT LOGIN
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
