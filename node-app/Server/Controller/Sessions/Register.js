const config = require("../../../config");

const { pipe } = require("ramda");

const { UserModel } = require("../../Model");

const { checkPropBySize, encrypt } = require("../../Helpers/utils");

const Register = async (req, res, next) => {
  
	const REQUEST_BODY = {
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
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

		const { username, email } = FINAL_OBJECT;

    try {
      const checkUsername = await UserModel.find({ username });
      if (checkUsername.length) {
        res.status(301).json({
          success: false,
          message: `Username ${
            username
          } is taken`
        });

        return;
      }
    } catch (e) {
      next(new Error(e.message));
    }

    try {
      const checkEmail = await UserModel.find({ email });
      if (checkEmail.length) {
        res.status(301).json({
          success: false,
          message: `Email Address ${
            email
          } is taken`
        });

        return;
      }
    } catch (e) {
      res.send({
        success: false,
        message: e.message,
      });
    }

    try {
      const user = await UserModel.create(FINAL_OBJECT);
      if (user) {
        res.status(200).json({
          success: true,
          message: `${
            username
          } was registered successfully`
        });
      }
    } catch (e) {
      res.send({
        success: false,
        message: e.message,
      });
    }
      
    return;
  }

	res.status(201).send({
		message: "Missing Credentials",
		body: REQUEST_BODY
	});

};

module.exports = Register;
