const Router = require('express').Router();

const {
  Posts
} = require('../../Controller');

const {
  BasicJWTValidator
} = require('../../Middleware')


const {
  CreatePost,
  GetPosts
} = Posts;

Router.post('/post', BasicJWTValidator, CreatePost);
Router.get('/posts', GetPosts);

module.exports = Router;
