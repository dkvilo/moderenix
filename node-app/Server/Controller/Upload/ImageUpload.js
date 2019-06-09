const { pipe } = require('ramda');

const { getKeyFormJWT, checkPropBySize } = require('../../Helpers/utils');
const { ImageModel } = require('../../Model');

const ImageUpload = async (req, res, next) => {

  const REQUEST_BODY = {
    name: req.file.filename,
    size: req.file.size,
    path: req.file.path,
    type: req.file.mimetype,
    storage: req.file.destination
	};

	const isValid = pipe(
		checkPropBySize,
		x => x.reduce((current, next) => current && next)
  )(REQUEST_BODY);
  
	if (isValid) {
    
    try {

      const { userById } = getKeyFormJWT(req.headers.token);
      const { _id } = userById;
 
      const image = await ImageModel.create(
        Object.assign({}, REQUEST_BODY, {
          owner: _id
        })
      );
      
      if (image) {
        res.send({
          success: true,
          message: 'Image was uploaded successfully',
          data: image
        });
      }

    } catch(e) {
      next(new Error(e.message));
    }

    return;
  }

  res.status(201).send({
		message: "Missing Credentials",
		body: REQUEST_BODY
	});

}

module.exports = ImageUpload;