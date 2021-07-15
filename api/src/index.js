const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', false);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');
  next();
});

require('./app/controllers/authController')(app);
require('./app/controllers/userController')(app);

app.use(express.static(__dirname + '/../../dist/'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});

app.get('/api', (req, res) => {
  console.log('live');
  return res.send({ status: 'live' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('on');
});