const axios = require('axios');
const express = require('express');
const router = express.Router();

const Repositories = require('./../../database/models/repo');

router.get('/', async (req, res) => {
  try {
    const query = req.query;
    const valid_query = ['access_token', 'token_type'];
    validQuery(res, query, valid_query);
    let uri = 'https://api.github.com/';
    if (query.q) {
      uri += `search/repositories?q=${query.q}`;
    } else if (query.starred) {
      uri += 'user/starred?';
    } else {
      uri += `user/repos?per_page=10&page=${query.page || 1}`;
    }
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

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = req.query;
    const valid_query = ['owner'];
    validQuery(res, query, valid_query);
    const repo = await Repositories.findOne({ git_node_id: id, user: query.owner });
    if (repo) {
      return res.send(repo);
    } else {
      return res.send({ tags: [] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Internal error. Failed to get the repository' });
  }
});

router.post('/update', async (req, res) => {
  try {
    const body = req.body;
    const repo = await Repositories.findOne({ git_node_id: body.git_node_id, user: body.user });
    await Promise.all([
      repo ?
        Repositories.findByIdAndUpdate(repo._id, { ...body }) :
        Repositories.create(body),
    ]).then(() => {
      return res.send({ success: true });
    }).catch(err => {
      console.log(err);
      return res.status(400).send({ error: 'Failed to update tags' });
    });
  } catch (error) {
    return res.status(500).send({ error: 'Internal error. Failed to update tags' });
  }
});

function validQuery(res, queries, validQueries) {
  validQueries.map(item => {
    const item_value = queries[item];
    if (!item_value) {
      return res.status(400).send({ error: `Missing ${item}` });
    }
  });
}

module.exports = app => app.use('/api/repo', router);