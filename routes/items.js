module.exports = (app, mongoose) => {
  const express = require("express");
  const router = express.Router();
  const controller = require("../controllers/items")(mongoose);
  const validator = require("../validators/validator");
  const { authenticate } = require("../auth/auth");
  router.get("/home", authenticate, controller.getItems); //home
  router.get("/viewItem/:id", authenticate, controller.viewItem); //view site
  router.get("/itemPassword/:id", authenticate, controller.copyPassword); // copy site password
  router.get("/sync", authenticate, controller.sync); // sync data
  router.get("/search", authenticate, controller.search); // search data
  router.post("/add", validator.item, authenticate, controller.addItem); // add item(site)
  router.post(
    "/edit/:id",
    validator.editItem,
    authenticate,
    controller.editItem
  ); // edit site credentials

  app.use("/api/v1/passManager", router);
};
