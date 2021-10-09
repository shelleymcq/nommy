// BRING IN MONGOOSE MODULE
const mongoose = require('mongoose');

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/users',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
