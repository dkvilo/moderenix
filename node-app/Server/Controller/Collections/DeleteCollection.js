const { UserModel, CollectionModel } = require('../../Model');

const DeleteCollection = (req, res) => {

  CollectionModel.findOne({_id: req.params.id})
    .then((collection) => {
      if (collection.author == req.session.user._id) {
        CollectionModel.findByIdAndUpdate({_id: req.params.id}, { isDeleted: true })
          .then((newCollection) => {
              res.send(newCollection);
              UserModel.findByIdAndUpdate({_id: newCollection.author}, {
                  $pull: {'collections': newCollection._id}
              }).then((data) => {
                  res.send({success: true, data, message: 'collection removed'});
              })
              .catch((err) => res.send(err));
          })
          .catch((err) => res.send(err));
        return;
      } else {
        res.send({success: false, message: 'Unable to Delete Collection, need to have owner permission'})
      }
    })
    .catch((err) => {
      res.send(err);
    })
}


module.exports = DeleteCollection;
