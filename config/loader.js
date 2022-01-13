const fs = require("fs");

const path = require("path");

const config = require("./config");

module.exports = function (app, mongoose) {
  const modelPath = config.app.root + "/models";
  const routePath = config.app.root + "/routes";
  fs.readdirSync(modelPath).forEach(function (file) {
    console.log("Loading Models:" + file);
    require(modelPath + "/" + file + "/schema.js")(mongoose);
  });

  fs.readdirSync(routePath).forEach(function (file) {
    console.log("Loading : " + file);
    require(routePath + "/" + file)(app, mongoose);
  });
};
