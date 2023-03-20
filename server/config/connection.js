// BRING IN MONGOOSE MODULE
const mongoose = require('mongoose');
const mongoose_user = process.env.MONGODB_USER || 'root'
const mongoose_pw = process.env.MONGODB_PASSWORD  || 'test'
const mongoose_host = process.env.MONGODB_HOST || 'localhost'
const mongoose_port = process.env.MONGODB_PORT || '27017'

const mongoose_uri = process.env.MONGODB_URI || `mongodb://${mongoose_user}:${mongoose_pw}@${mongoose_host}:${mongoose_port}/`

// CONNECT TO MONGOOSE DATABASE
mongoose.connect(
  mongoose_uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
