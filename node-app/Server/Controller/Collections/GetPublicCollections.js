const { CollectionModel } = require('../../Model');

const GetPublicCollections = (req, res, next) => {
  CollectionModel.find({isDeleted: false, isPrivate: false})
    .populate({
      path: 'author',
      select: '-membership -email -isAdmin -updated_at -created_at -deleted_at -isPrivate -__v -_id -password -isDeleted -avatar -collections'
    })
    .select('-__v')
    .then((collection) => {
        res.send(collection);
    })
    .catch((err) => res.send(err));
};


module.exports = GetPublicCollections;
