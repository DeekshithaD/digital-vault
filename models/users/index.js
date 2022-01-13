const bcrypt = require("bcryptjs");
module.exports = function (schema, mongoose) {
  schema.statics.correctedPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };
  schema.statics.signUp = async function (userData) {
    const data = await this.create(userData);
    return data;
  };
  schema.statics.getdata = async function () {
    let data = await this.find({});
    return data;
  };
  schema.statics.getUserMpin = async function (mobileNumber) {
    const data = await this.findOne({ userName: mobileNumber }).select("+mPin");
    return data;
  };
  schema.statics.getUser = async function (mobileNumber) {
    const data = await this.findOne({ userName: mobileNumber });
    return data;
  };
  schema.statics.getUserPasswordResetCount = async function (mobileNumber) {
    const data = await this.findOne({
      userName: mobileNumber,
    }).select("+passwordResetCount");
    return data;
  };
  return schema;
};
