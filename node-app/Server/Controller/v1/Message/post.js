const { MessageModel } = require("../../../Model");
const { BasicFormatValidation } = require("../../../../Validation");

module.exports = (req, res, next) => {
  (async () => {
    try {
      const errors = BasicFormatValidation(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const response = await MessageModel.create(req.body);
      return res.json({
        success: true,
        message: "Message was created successfully",
        data: response
      });
    } catch (e) {
      return res.json({ success: false, message: e.message });
    }
  })();
};
