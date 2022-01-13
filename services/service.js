const config = require("../config/config");
const utils = require("../utils/util");
const client = require("twilio")(config.accountSid, config.authToken);

exports.sendOTP = async (req, res, phoneNumber) => {
  client.verify.services(config.serviceSId).verifications.create({
    to: phoneNumber,
    channel: "sms",
  });
  utils.sendResponse(
    req,
    res,
    200,
    "Success",
    "OTP has been sent  successfully please verify  the OTP in order to proceed"
  );
};
exports.verifycode = async (req, res, phoneNumber, next) => {
  const check = await client.verify
    .services(config.serviceSId)
    .verificationChecks.create({
      to: phoneNumber,
      code: req.body.otp,
    })
    .catch((e) => {
      utils.sendErrorResponse(req, res, 500, "fail", "Invalid Otp");
    });

  return check;
};
