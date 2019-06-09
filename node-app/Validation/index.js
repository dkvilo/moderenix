const Joi = require('@hapi/joi');

const Auth = {
  body: {
    username: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()
  }
};

const Register = {};

module.exports = {
  Auth,
  Register
}
