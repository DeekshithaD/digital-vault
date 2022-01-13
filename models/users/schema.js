const bcrypt = require("bcryptjs");
module.exports = function (mongoose) {
  const config = require("../../config/config");
  const userSchema = new mongoose.Schema({
    userName: {
      type: String,
      unique: true,
    },
    mPin: {
      type: String,
      required: [true, "Please provide a 4 digit password"],
      select: false,
    },
    confirmMpin: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.mPin;
        },
        message: "Passwords are not same",
      },
    },
    passwordResetCount: {
      type: Number,
      select: false,
    },
    otp: String,
  });
  userSchema.pre("save", async function (next) {
    // @ts-ignore
    if (!this.isModified("mPin")) return next();
    //hash password
    this.mPin = await bcrypt.hash(this.mPin, config.salt);
    this.confirmMpin = undefined;
    this.otp = undefined;
    next();
  });
  require("./index")(userSchema, mongoose);
  return mongoose.model("User", userSchema);
};
