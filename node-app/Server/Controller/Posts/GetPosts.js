const { PostModel } = require("../../Model");

const GetPosts = (req, res, next) => {
	PostModel.find({ isDeleted: false })
		.sort("-publishedAt")
		.populate({
			path: "author",
			select: "username name -_id avatar"
		})
		.limit(20)
		.then(news => {
			res.send(news);
		})
		.catch(err => res.send(err));
};

module.exports = GetPosts;
