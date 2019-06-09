const { pipe } = require('ramda');
const { CollectionModel } = require('../../Model');

const {
  checkPropBySize
} = require('../../Helpers/utils');

const UpdateCollection = (req, res) => {

    const REQUEST_BODY = {
        title : req.body.title,
        icon : req.body.icon,
        description : req.body.description,
        isPrivate : req.body.isPrivate,
        hasBranch : req.body.hasBranch,
        hasTags: req.body.hasTags
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

      CollectionModel.findOne({_id: req.params.id})
        .then((collection) => {
          if (collection.author == req.session.user._id) {
            CollectionModel.findByIdAndUpdate({_id: req.params.id}, FINAL_OBJECT)
              .then((newCollection) => {
                  res.send(newCollection);
              })
              .catch((err) => res.send(err));
            return;
          } else {
            res.send({success: false, message: 'Unable to uptade Collection, need to have owner permission'})
          }
        })
        .catch((err) => {
          res.send(err);
        })
        return;
    }

    res.status(201).send({
        message: 'Missing Credentials',
        body: REQUEST_BODY
    })
}


module.exports = UpdateCollection;
