const validationResult = require("express-validator/check").validationResult;

const BasicFormatValidation = validationResult.withDefaults({
	formatter: error => {
		return {
			param: error.param,
			message: error.msg
		};
	}
});

module.exports = BasicFormatValidation;
