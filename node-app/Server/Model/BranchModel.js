const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    name: {
      type: String,
    },
    source: {
      type: String
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    ep: {
      type: String
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    deleted_at: {
      type: Date
    }
});

const BranchModel = mongoose.model('branch', BranchSchema);
module.exports = BranchModel;
