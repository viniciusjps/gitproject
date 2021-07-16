const mongoose = require('../index.js');

const RepoSchema = new mongoose.Schema({
  git_node_id: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    required: false
  }],
  user: {
    type: String,
    required: true,
  },
  github_data: {
    type: Object,
    required: true,
  }
}, {
  versionKey: false,
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Repositories = mongoose.model('Repositories', RepoSchema);
module.exports = Repositories;