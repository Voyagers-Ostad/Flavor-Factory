const express = require("express");
const router = express.Router();
const {
  userSignup,
  userLogin,
  userProfile,
  userLogOut,
  sendEmail,
  activateAccount,
} = require("../controllers/UserController");
const {
  userSignupValidator,
  userLoginValidator,
  validate,
} = require("../middlewares/validator");
const { checkForAuth } = require("../middlewares/auth");

// Route for user signup
router.post("/signup", userSignupValidator, validate, userSignup);
router.post("/login", userLoginValidator, validate, userLogin);

// Private routes (authentication required)
// router.use(checkForAuth('token'));

router.get("/profile", checkForAuth("token"), userProfile);
router.get("/logout", userLogOut);

//verification
router.post("/send-email", sendEmail);
router.post("/activate", activateAccount);
module.exports = router;
