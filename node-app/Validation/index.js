const { check } = require("express-validator/check");
const BasicFormatValidation = require("./Formatter");

function body(actionType) {
  switch (actionType) {
    /*
     * Create Message Validation
     */
    case "CREATE_MESSAGE": {
      return [
        check("content")
          .not()
          .isEmpty()
          .withMessage("Message `content` is required")
      ];
    }
  }
}

module.exports = {
  body,
  BasicFormatValidation
};
