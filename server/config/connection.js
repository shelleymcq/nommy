// BRING IN MONGOOSE MODULE
const mongoose = require('mongoose');
const mongoose_user = process.env.MONGODB_USER
const mongoose_pw = process.env.MONGODB_PASSWORD
const mongoose_host = process.env.MONGODB_HOST
const mongoose_port = process.env.MONGODB_PORT

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
