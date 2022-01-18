module.exports = function (mongoose) {
  const config = require("../config/config");
  const services = require("../services/service");
  const utils = require("../utils/util");
  var jwt = require("jsonwebtoken");
  const userController = {};
  const Users = mongoose.model("User");
  const Item = mongoose.model("Item");
  /************************* ********************USER SIGNUP************************************************* */
  userController.signUp = async function (req, res, next) {
    try {
      const userData = {
        userName: req.body.userName,
        mPin: req.body.mPin,
        confirmMpin: req.body.confirmMpin,
        passwordResetCount: 1,
      };
      const data = await Users.signUp(userData);
      utils.sendResponse(
        req,
        res,
        200,
        "Success",
        "",
        "Account Created Successfully"
      );
    } catch (err) {
      utils.sendErrorResponse(
        req,
        res,
        400,
        "fail",
        err.name === "MongoError" || err.code === 11000
          ? "Mobile number already in use!"
          : err.message
      );
    }
  };

  /*********************************************USER LOGIN************************************************* */
  userController.login = async (req, res, next) => {
    let statusCode = 400;
    try {
      const { mobileNumber, mPin } = req.body;

      if (!mobileNumber || !mPin) {
        throw new Error("Please provide the  Mobile Number  and Password");
      }
      const user = await Users.getUserMpin(mobileNumber);
      const correct = await Users.correctedPassword(mPin, user.mPin);
      if (!user || !correct) {
        statusCode = 401;
        throw new Error("Invalid Authorization(invalid email or password)");
      }
      const token = jwt.sign({ id: user._id }, config.jwtSecret);
      req.user = user;
      res.status(200).json({ status: "success", token: token, data: user });
      next();
    } catch (err) {
      utils.sendErrorResponse(req, res, statusCode, "fail", err.message);
    }
  };
  /*********************************************GET ALL USERS************************************************* */
  userController.getdata = async (req, res) => {
    try {
      let data = await Users.getdata();

      utils.sendResponse(req, res, 200, "Success", data);
    } catch (err) {
      utils.sendErrorResponse(req, res, 404, "fail", err.message);
    }
  };
  /*********************************************FORGOT mPIN************************************************* */
  userController.forgotMpin = async (req, res, next) => {
    try {
      const phoneNumber = "+91" + req.body.mobileNumber;
      const user = await Users.getUser(req.body.mobileNumber);
      if (!user) {
        throw new Error("user not found");
      } else {
        await services.sendOTP(req, res, phoneNumber);
        return;
      }
    } catch (err) {
      utils.sendErrorResponse(req, res, 404, "fail", err.message);
    }
  };
  /*********************************************RESET MPIN************************************************* */
  userController.resetMpin = async (req, res) => {
    try {
      const phoneNumber = "+91" + req.body.mobileNumber;
      const check = await services.verifycode(req, res, phoneNumber);
      const user = await Users.getUserPasswordResetCount(req.body.mobileNumber);

      if (check) {
        if (user.passwordResetCount == 1) {
          user.mPin = req.body.mPin;
          user.confirmMpin = req.body.mPin;
          user.passwordResetCount = 0;
          await user.save();
          utils.sendResponse(req, res, 200, "Success", "MPin reset successful");
        } else {
          await Item.deleteMany({ user: user._id });
          await Users.findOneAndDelete({
            userName: req.body.mobileNumber,
          }).then(() => {
            utils.sendErrorResponse(
              req,
              res,
              200,
              "fail",
              "You have reached the maximum limit to  reset mPin therefore your data has been deleted "
            );
          });
        }
      }
    } catch (err) {
      utils.sendErrorResponse(req, res, 204, "success", err.message);
    }
  };
  return userController;
};
