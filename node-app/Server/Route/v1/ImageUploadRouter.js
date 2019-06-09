const Router = require('express').Router();
const uuidV1 = require('uuid/v1');
const multer = require('multer');
const fs = require('fs');

const config = require('../../../config');

const {
  Upload
} = require('../../Controller');

const {
  BasicJWTValidator
} = require('../../Middleware')

const {
  ImageUpload,
} = Upload;

const imageUploadPath = `./${config.server.storage.path}/${config.server.storage.image}`;

const Storage = multer.diskStorage({

  destination: (req, file, next) => {
    if (!fs.existsSync(imageUploadPath)) {
      fs.mkdirSync(`./${config.server.storage.path}/`);
      fs.mkdirSync(`./${config.server.storage.path}/${config.server.storage.image}/`);
    }
    next(null, imageUploadPath);
  },

  filename: function ( req, file, next ) {

    const { mimetype } = file;

    if (mimetype === 'image/png') {
      next(null, uuidV1() + '-' + Date.now() + ".png");
    }

    else if (mimetype === 'image/jpeg') {
      next(null, uuidV1() + '-' + Date.now() + ".jpg");
    }

    else if (mimetype === 'image/gif') {
      next(null, uuidV1() + '-' + Date.now() + ".gif");
    }

    else {
      next(new Error('Invalid image, Only certain formats (PNG, JPG/JPEG and GIF) are allowed '), null);
    }
    
  }
});

const upload = multer({ storage: Storage })

Router.post('/upload', BasicJWTValidator, upload.single('image'), ImageUpload);

module.exports = Router;
