const Router = require('express').Router();
const validate = require('express-validator');

const Validation = require('../../../Validation'); 

const { Sessions, Users } = require('../../Controller');

const {
  Auth,
  Register
} = Sessions;

const {
  GetUsers
} = Users;

Router.post('/sessions/login', validate(Validation.Auth), Auth);
Router.post('/sessions/signup', Register);
Router.get('/users', GetUsers);

module.exports = Router;
