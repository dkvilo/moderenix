const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
});

const MessageModel = mongoose.model("message", MessageSchema);

module.exports = MessageModel;
