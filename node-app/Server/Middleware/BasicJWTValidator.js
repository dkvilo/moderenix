const jwt = require("jsonwebtoken"),
	express = require("express"),
	router = express.Router(),
	config = require("../../config");
/*
 * Token Validation Middleware
 */
router.use((req, res, next) => {
	let token = req.body.token || req.headers["token"] || req.query.token;

	if (token) {
		jwt.verify(token, config.salt.jwt, (err, decode) => {
			if (err) {
				res.status(500).send({ success: false, message: "invalid token" });
			} else {
				next();
			}
		});
	} else {
		res.send({
			success: false,
			message: "You need permission for this action"
		});
	}
});

module.exports = router;
