const Router = require("express").Router();

const { V1 } = require("../../Controller");
const Validate = require("../../../Validation");

Router.get("/message", V1.Message.GetMessage);
Router.post(
  "/message",
  Validate.body("CREATE_MESSAGE"),
  V1.Message.PostMessage
);

module.exports = Router;
