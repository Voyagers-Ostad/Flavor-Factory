const { check, validationResult } = require('express-validator');

exports.userSignupValidator = [
 
  check('name', "Name is required").notEmpty(),
  check('email', "Invalid email").isEmail(),
  check('password', "Password must be at least 6 characters").isLength({ min: 6 }),
];

exports.userLoginValidator = [

  check('email', "Invalid email").isEmail(),
  check('password', "Password must be at least 6 characters").isLength({ min: 6 }),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
