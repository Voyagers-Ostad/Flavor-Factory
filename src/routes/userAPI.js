const express = require('express');
const router = express.Router();
const { userSignup, userLogin,userProfile,userLogOut } = require('../controllers/UserController');
const { userSignupValidator, userLoginValidator, validate } = require('../middlewares/validator');
const { checkForAuth}=require('../middlewares/auth')

// Route for user signup
router.post('/signup', userSignupValidator, validate, userSignup);
router.get('/login', userLoginValidator, validate, userLogin);

// Private routes (authentication required)
// router.use(checkForAuth('token'));

router.get('/profile',checkForAuth('token'),userProfile)
router.get('/logout', userLogOut)


module.exports = router;
