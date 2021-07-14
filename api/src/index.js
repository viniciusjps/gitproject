const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', false);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  next();
});

require('./app/controllers/auth')(app);

app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/gitproject/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('on');
});