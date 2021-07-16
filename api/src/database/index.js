const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
};

mongoose.connect(MONGO_URI, MONGO_OPTIONS)
  .then(() => {
    console.log('Database successfully connected.');
  }).catch(err => {
    console.log('Database connection error.');
    console.log(err);
  });

mongoose.Promise = global.Promise;
module.exports = mongoose;