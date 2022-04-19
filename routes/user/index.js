const { Router } = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');


const { corsWithOptions } = absoluteRequire('modules/cors');
const {
  SignUp,
  LogIn,
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

module.exports = router;