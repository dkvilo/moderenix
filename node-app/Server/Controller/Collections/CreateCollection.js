
const { pipe } = require('ramda');

const { UserModel, CollectionModel } = require('../../Model');

const {
    checkPropBySize
} = require('../../Helpers/utils');

const CreateCollection = (req, res) => {

    const REQUEST_BODY = {
        title : req.body.title,
        icon : req.body.icon,
        description : req.body.description,
        isPrivate : req.body.isPrivate,
        hasBranch : req.body.hasBranch,
        hasTags: req.body.hasTags,
        author: req.body.author
    };

    if (REQUEST_BODY.hasBranch){
      if ( !req.body.hasOwnProperty('branch') ) {
        REQUEST_BODY['branch'] = req.body.branch;
      }
    }

    if (REQUEST_BODY.hasTags){
      if ( !req.body.hasOwnProperty('tags') ) {
        REQUEST_BODY['tags'] = req.body.tags;
      }
    }

    const isValid = pipe(
        checkPropBySize,
        x => x.reduce((current, next) => current && next)
    )(REQUEST_BODY);

    if (isValid) {

      let FINAL_OBJECT = REQUEST_BODY;

      if (REQUEST_BODY.hasBranch) {
        FINAL_OBJECT = Object.assign({ branch : req.body.branch }, REQUEST_BODY);
      }

      if (REQUEST_BODY.hasTags) {
        FINAL_OBJECT = Object.assign({ tags : req.body.tags }, REQUEST_BODY);
      }

      CollectionModel.create(FINAL_OBJECT)
        .then((newCollection) => {
            UserModel.findByIdAndUpdate({_id: FINAL_OBJECT.author}, {
                $push: {'collections': newCollection._id }
            }).then((data) => {
                res.send(newCollection);
            })
            .catch((err) => res.send(err));
        })
        .catch((err) => res.send(err));
      return;
    }

    res.status(201).send({
        message: 'Missing Credentials',
        body: REQUEST_BODY
    })
}


module.exports = CreateCollection;
