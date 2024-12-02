const validator = require("validatorjs");

const loginValidation = async (req, res, next) => {
  const rules = {
    email: "required|email",
    password: "required|min:8",
  };

  const validation = new validator(req.body, rules);
  if (validation.fails()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: validation.errors.all(),
    });
  }
  next();
};

const registerValidation = async (req, res, next) => {
  const rules = {
    username: "required|string|min:3|max:20",
    email: "required|email",
    password: "required|min:8",
  };

  const validation = new validator(req.body, rules);
  if (validation.fails()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: validation.errors.all(),
    });
  }
  next();
};

module.exports = {
  loginValidation,
  registerValidation,
};
