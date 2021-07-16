const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  return res.send({ status: 'live' });
});

require('./app/controllers/authController')(app);
require('./app/controllers/userController')(app);
require('./app/controllers/repoController')(app);

app.use(express.static(__dirname + '/../../dist/'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('on');
});