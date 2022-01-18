module.exports = function (mongoose) {
  const crypto = require("crypto");
  const config = require("../../config/config");
  function encrypt(text) {
    var cipher = crypto.createCipher(config.algorithm, config.cryptoSecrete);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }
  function decrypt(text) {
    if (text === null || typeof text === "undefined") {
      return text;
    }
    var decipher = crypto.createDecipher(
      config.algorithm,
      config.cryptoSecrete
    );
    var dec = decipher.update(text, "hex", "utf8") + decipher.final("utf8");

    return dec;
  }
  const itemSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user",
      },
      url: {
        type: String,
      },
      icon: String,
      category: {
        type: String,
        lowercase: true,
      },
      siteName: {
        type: String,
      },
      userName: String,
      sitePassword: { type: String, get: decrypt, set: encrypt },
      notes: String,
    },
    {
      toJSON: { getters: true, setters: true },
      toObject: { getters: true, setters: true },
    }
  );
  require("./index")(itemSchema, mongoose);
  return mongoose.model("Item", itemSchema);
};
