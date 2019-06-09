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
				res.status(500).send({ success: false, message: "Invalid token" });
			} else {
				if (decode.data.isAdmin) {
					next();
				} else {
					res.status(201).send({
						success: false,
						message: "Access Denied!"
					});
				}
			}
		});
	} else {
		res.send({ success: false, message: "Need permission" });
	}
});

module.exports = router;
