const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/access_token', async (req, res) => {
  try {
    const body = req.body;
    const valid_body = ['client_id', 'client_secret', 'code', 'redirect_uri'];
    let uri = 'https://github.com/login/oauth/access_token?';
    valid_body.map(item => {
      const item_value = body[item];
      if (!item_value) {
        return res.status(400).send({ error: `Missing ${item}` });
      } else {
        uri += `&${item}=${item_value}`;
      }
    });
    await axios.post(uri, {}, { headers: { 'Accept': 'application/json' } })
      .then(response => {
        return res.send(response?.data);
      }).catch(err => {
        return res.status(400).send({ error: 'Failed to get the access token' });
      });
  } catch (error) {
    return res.status(500).send({ error: 'Failed to get the access token' });
  }
});

module.exports = app => app.use('/api/auth', router);