const Router = require('express').Router();

const {
  Collections
} = require('../../Controller');

const { BasicJWTValidator } = require('../../Middleware');

const {
  CreateCollection,
  UpdateCollection,
  DeleteCollection,
  GetPublicCollections
} = Collections;

Router.post('/collection', BasicJWTValidator, CreateCollection);
Router.put('/collection/:id', BasicJWTValidator, UpdateCollection);
Router.delete('/collection/:id', BasicJWTValidator, DeleteCollection);
Router.get('/collection', BasicJWTValidator, GetPublicCollections);

module.exports = Router;
