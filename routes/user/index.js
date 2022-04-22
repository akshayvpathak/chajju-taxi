const { Router } = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { verifyUserFromToken, verifyAdmin } = absoluteRequire('controller/Auth');

const { corsWithOptions } = absoluteRequire('modules/cors');
const {
  SignUp,
  LogIn,
  verifyUser,
  getUserInfo,
  updateUserInfo
} = absoluteRequire('controller/User');

const router = Router();
router.use(bodyParser.json());

router.route('/signup').post(corsWithOptions,
  body('email_id').isEmail(),
  body('password').notEmpty(),
  body('fullname').notEmpty(),
  (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
      next();
    }
  }
  , SignUp);
router.route('/login').post(corsWithOptions, LogIn);
router.route('/verifyUser').post(corsWithOptions, verifyUser);
router.route('/user/:id').get(corsWithOptions, verifyUserFromToken, getUserInfo);
router.route('/user/:id').post(corsWithOptions, verifyUserFromToken, updateUserInfo);

module.exports = router;