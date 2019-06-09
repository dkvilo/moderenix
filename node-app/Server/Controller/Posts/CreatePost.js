const { getKeyFormJWT, checkPropBySize } = require('../../Helpers/utils');
const { PostModel } = require('../../Model');
const { pipe } = require('ramda');

const CreatePost = async (req, res, next) => {

  const REQUEST_BODY = {
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
    image: req.body.image || '',
    tags: req.body.tags || []
	};

	const isValid = pipe(
		checkPropBySize,
		x => x.reduce((current, next) => current && next)
  )(REQUEST_BODY);
  
	if (isValid) {
    
    const { userById } = getKeyFormJWT(req.headers.token);
    const { _id } = userById;

    const FINAL_OBJECT = Object.assign({}, REQUEST_BODY, {
    	author: _id
		});

    try {
      const post = await PostModel.create(FINAL_OBJECT);
      res.status(200).send({
        success: true,
        message: "Post published successfully",
        data: post
      });
    } catch (e) {
      next(new Error(e.message));
    }

    return;
  }

	res.status(201).send({
		message: "Missing Credentials",
		body: REQUEST_BODY
  });
  
}


module.exports = CreatePost;
