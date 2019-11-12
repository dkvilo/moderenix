const { MessageModel } = require("../../../Model");

module.exports = (req, res, next) => {
  (async () => {
    try {
      const response = await MessageModel.find({ isDeleted: false });
      return res.json({ success: true, data: response });
    } catch (e) {
      return res.json({ success: false, message: e.message });
    }
  })();
};
