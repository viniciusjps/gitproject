const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('access_token', async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app => app.use('/api/auth', router);