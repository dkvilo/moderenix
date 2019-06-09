const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    collections: [{
      type: Schema.ObjectId,
      ref: 'collection'
    }],
    membership: {
      expire: {
        type: Date
      },
      type: {
        type: String,
        default: 'basic'
      },
      history: [{
        type: Schema.ObjectId
      }]
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date
    },
    deleted_at: {
      type: Date
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
