const mongoose = require('mongoose');

// TODO: Replace database name in url (b4 deployment turn into ENV secret)

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/polyFlowDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
