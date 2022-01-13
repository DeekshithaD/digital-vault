const config = require("../config/config");
const jwt = require("jsonwebtoken");
exports.authenticate = (req, res, next) => {
  try {
    //get auth header value
    const bearerHeader = req.headers["authorization"];
    //check if undefined
    if (typeof bearerHeader !== "undefined") {
      //split space
      // @ts-ignore
      const bearer = bearerHeader.split(" ");
      //get token from array
      const bearerToken = bearer[1];
      req.token = bearerToken;
    } else {
      //
      throw new Error("Please login and provide the token");
    }

    const decoded = jwt.verify(req.token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};
