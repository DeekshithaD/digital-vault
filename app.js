const mongoose = require("./config/mongodb");
const express = require("express");
const bodyparser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var _ = require("lodash");
const app = express();
const config = require("./config/config");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.all("*", function (req, res, next) {
  var headers = _.clone(req.headers);
  var body = _.clone(req.body);
  console.log(`Request Headers: ${headers ? JSON.stringify(headers) : ""}`);
  console.log(`Request Body: ${body ? JSON.stringify(body) : ""}`);

  next();
});
require("./config/loader")(app, mongoose);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const port = config.app.port;
app.listen(port, () => {
  console.log(` app listening on port ${port}!`);
});
