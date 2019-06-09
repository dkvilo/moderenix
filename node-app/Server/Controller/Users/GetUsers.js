const { UserModel } = require('../../Model');

const GetUserList = (req, res, next) => {
  UserModel.find({})
    .populate({
      path: 'collections',
      select: '-author -__v -updated_at -isDeleted -branch -icon -tags -views -isPrivate'
    })
    .select('-password -email -__v -isDeleted -isPrivate -isAdmin')
    .then((user) => res.send(user))
    .catch((err) => res.send(err));
};

module.exports = GetUserList;
