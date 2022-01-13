module.exports = function (mongoose) {
  const { LogoScrape } = require("logo-scrape");
  const fs = require("fs");
  const cpy = require("copy-paste");
  const utils = require("../utils/util");
  const itemController = {};
  const Item = mongoose.model("Item");
  /*********************************************ADD ITEM************************************************* */
  itemController.addItem = async function (req, res) {
    try {
      const logo = await LogoScrape.getLogo(req.body.url);
      const itemData = {
        user: req.user.id,
        url: req.body.url,
        icon: logo.url,
        category: req.body.category,
        siteName: req.body.siteName,
        userName: req.body.userName,
        sitePassword: req.body.sitePassword,
        notes: req.body.notes,
      };
      const avaliableData = await Item.findOne({
        user: req.user.id,
        url: req.body.url,
        siteName: req.body.siteName,
      });
      if (avaliableData != null) {
        throw new Error(
          "There is a data availble for corresponding url or Site Name. Please provide the unique url and SiteName"
        );
      } else {
        const data = await Item.addItem(itemData);
        utils.sendResponse(req, res, 201, "Success", data);
      }
    } catch (err) {
      utils.sendErrorResponse(req, res, 400, "fail", err.message);
    }
  };
  /*********************************************GET ITEMS************************************************* */
  itemController.getItems = async (req, res) => {
    try {
      if (req.query.sector) {
        const data = await Item.getItemsByCategory(
          req.user.id,
          req.query.sector
        );
        if (data.length === 0) {
          throw new Error("Items are not availble with corresponging category");
        }
        utils.sendResponse(req, res, 200, "Success", data);
      } else {
        const data = await Item.getItems(req.user.id);
        if (data.length === 0) {
          throw new Error("Please add the document view Website Credentials");
        }
        utils.sendResponse(req, res, 200, "Success", data);
      }
    } catch (err) {
      utils.sendErrorResponse(req, res, 400, "fail", err.message);
    }
  };
  /*********************************************VIEW ITEM************************************************* */
  itemController.viewItem = async (req, res) => {
    try {
      const data = await Item.viewItem(req.params.id);
      utils.sendResponse(req, res, 200, "Success", data);
    } catch (err) {
      utils.sendErrorResponse(req, res, 404, "fail", err.message);
    }
  };
  /*********************************************EDIT ITEM************************************************* */
  itemController.editItem = async (req, res) => {
    try {
      const data = await Item.editItem(req.params.id, req.body);
      utils.sendResponse(req, res, 200, "Success", data);
    } catch (err) {
      utils.sendErrorResponse(
        req,
        res,
        400,
        "fail",
        err.name === "MongoError" || err.code === 11000
          ? "There is a data availble for corresponding url or Site Name. Please provide the unique url and SiteName ."
          : err.message
      );
    }
  };
  /*********************************************COPY PASSWORD************************************************* */
  itemController.copyPassword = async (req, res) => {
    try {
      const data = await Item.viewItem(req.params.id);
      cpy.copy(data.sitePassword);
      utils.sendResponse(
        req,
        res,
        200,
        "Success",
        "",
        "Password has been copied to clipboard successfully."
      );
    } catch (err) {
      utils.sendErrorResponse(req, res, 400, "fail", err.message);
    }
  };
  /*********************************************SYNC DATA************************************************* */
  itemController.sync = async (req, res) => {
    try {
      const itemData = await Item.getItemsforSync(req.user.id);
      const data = JSON.stringify(itemData, null, 2);
      fs.writeFile("data.json", data, function (err) {
        if (err) {
          throw new Error(
            "Sorry an unexpected error occured please try again later"
          );
        } else {
          utils.sendResponse(
            req,
            res,
            200,
            "Success",
            itemData,
            "Data has been saved to data.json file successfully"
          );
        }
      });
    } catch (err) {
      utils.sendErrorResponse(req, res, 400, "fail", err.message);
    }
  };
  return itemController;
};
