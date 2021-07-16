const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = req.query;
    const valid_query = ['access_token', 'token_type'];
    let uri = 'https://api.github.com/';
    if (query.q) {
      uri += `search/repositories?q=${query.q}`;
    } else if (query.starred) {
      uri += 'user/starred?';
    } else {
      uri += 'user/repos?';
    }
    valid_query.map(item => {
      const item_value = query[item];
      if (!item_value) {
        return res.status(400).send({ error: `Missing ${item}` });
      }
    });
    await axios.get(uri, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `${query.token_type} ${query.access_token}`
      }
    }).then(response => {
      return res.send(response?.data);
    }).catch(err => {
      console.log(err);
      return res.status(400).send({ error: 'Failed to get list of repositories' });
    });
  } catch (error) {
    return res.status(500).send({ error: 'Internal error. Failed to get list of repositories' });
  }
});

module.exports = app => app.use('/api/repo', router);