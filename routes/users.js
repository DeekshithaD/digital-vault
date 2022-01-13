module.exports = (app, mongoose) => {
  const express = require("express");
  const controller = require("../controllers/users")(mongoose);
  const validator = require("../validators/validator");
  const router = express.Router();

  router.post("/signUp", validator.signUp, controller.signUp);
  router.post("/login", controller.login);
  router.post("/forgotMpin", controller.forgotMpin);
  router.post("/resetMpin", controller.resetMpin);
  app.use("/api/v1/passManager", router);
};
