const { number } = require("joi");
const Joi = require("joi-oid");
exports.signUp = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    mPin: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/)
      .messages({
        "string.pattern.base": "Password should be 4",
      })
      .required(),
    confirmMpin: Joi.string()
      .length(4)
      .pattern(/^[0-9]+$/)
      .required(),
    passwordResetCount: Joi.number(),
    otp: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({
      status: "Inavlid data",
      message: error.message,
    });
  } else {
    req.body = value;
    next();
  }
};
exports.item = (req, res, next) => {
  const schema = Joi.object({
    user: Joi.objectId(),
    url: Joi.string().uri().required(),
    category: Joi.string(),
    siteName: Joi.string().required(),
    userName: Joi.string(),
    sitePassword: Joi.string(),
    notes: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({
      status: "Inavlid data",
      message: error.message,
    });
  } else {
    req.body = value;
    next();
  }
};
exports.editItem = (req, res, next) => {
  const schema = Joi.object({
    user: Joi.objectId(),
    url: Joi.string().uri(),
    category: Joi.string(),
    siteName: Joi.string(),
    userName: Joi.string(),
    sitePassword: Joi.string(),
    notes: Joi.string(),
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(422).json({
      status: "Inavlid data",
      message: error.message,
    });
  } else {
    req.body = value;
    next();
  }
};
