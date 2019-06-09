const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
      type: String,
    },
    image: {
      type: String
    },
    author: {
      type: Schema.ObjectId,
      ref: 'user'
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    views: [{
      type: Schema.ObjectId,
      ref: 'user'
    }],
    publishedAt: {
      type: Date,
      default: Date.now
    },
    tags: [{
      type: String
    }]
});

const PostModel = mongoose.model('post', PostSchema);
module.exports = PostModel;
