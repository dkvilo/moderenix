const crypto = require('crypto');
const config = require('../../config');
const jwt = require("jsonwebtoken");

const {
  values
} = require('lodash');

/*
* Throws: [Error]
*/
const throwException = msg => new Error(msg);


const getKeyFormJWT = (token) => {
  return jwt.verify(token, config.salt.jwt, (err, decode) => {
    if (err) return undefined;
    return decode;
  });
}

/*
* param: [Object]
* param: [Number]
* returns: [Array || Error]
* DefaultValues: Number [max] = 2
*/
const checkPropBySize = (obj, max = 2) =>
  (!obj) ? console.log(throwException('Missing required param Type: [Object]')) :
    values(obj).map((each) => (each === undefined) ? false : true);

/*
* param: [Object]
* returns: [Number || Error]
*/
const getPropSize = obj =>
  (!obj) ? console.log(throwException('Missing required param')) :
    Object.getOwnPropertyNames(obj).length;


const encrypt = (salt, value) => crypto.createCipher('aes-256-ctr', salt).update(value, 'utf-8', 'hex');

module.exports = {
  throwException,
  checkPropBySize,
  getPropSize,
  getKeyFormJWT,
  encrypt
};
