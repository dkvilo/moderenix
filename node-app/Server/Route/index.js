const UserRouter = require('./v1/UserRouter');
const CollectionRouter = require('./v1/CollectionRouter');
const PostRouter = require('./v1/PostRouter');
const ImageUploadRouter = require('./v1/ImageUploadRouter');

const V1 = {
  UserRouter,
  CollectionRouter,
  PostRouter,
  ImageUploadRouter
}

module.exports = {
  V1
};
