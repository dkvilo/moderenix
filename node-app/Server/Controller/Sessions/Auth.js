const jwt = require("jsonwebtoken");

const config = require("../../../config");

const { UserModel } = require("../../Model");

const { pipe } = require("ramda");

const { checkPropBySize, encrypt } = require("../../Helpers/utils");

const Auth = async (req, res, next) => {
	
	const REQUEST_BODY = {
		username: req.body.username,
		password: req.body.password
  };
  
	const isValid = pipe(
		checkPropBySize,
		x => x.reduce((current, next) => current && next)
	)(REQUEST_BODY);

	if (isValid) {

		const FINAL_OBJECT = Object.assign({}, REQUEST_BODY, {
			password: encrypt(config.salt.password, req.body.password)
		});

    const user = await UserModel.findOne(FINAL_OBJECT);
    
		if (user) {

			const userById = await UserModel.findById(user._id).select("-password -collections");

			if (userById.isDeleted) {
				res.status(301).send({ success: false, message: "This account is disabled" });
				return;
			}

			const token = jwt.sign({ userById }, config.salt.jwt, {
				expiresIn: 60 * 60 * 24
			});
						
			res.send({ user: userById, token });

			return;
		}
 
		res.status(404).send({ success: false, message: "User Not found" })

		return;
	} 
	
	res.status(400).send({ success: false, message: "missing credentials" });

};

module.exports = Auth;
