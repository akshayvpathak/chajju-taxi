const { Router } = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const fileUpload = require('express-fileupload');
const { verifyUserFromToken } = absoluteRequire('controller/Driver_Auth');

const { corsWithOptions } = absoluteRequire('modules/cors');

const {
    SignUpDriver,
    driverDocumentsUpload,
    driverLogin,
    getDriverInfo,
    allDrivers,
    updateDriverStatus

} = absoluteRequire('controller/Driver');


const router = Router();
router.use(bodyParser.json());
router.use(fileUpload());

router.route('/driverSignup').post(corsWithOptions,
    body('email_id').isEmail(),
    body('password').notEmpty(),
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('city').notEmpty(),
    body('country').notEmpty(),
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
    , SignUpDriver);


router.route('/driverDocumentsUpload').post(driverDocumentsUpload);
router.route('/login').post(corsWithOptions, driverLogin);
router.route('/all').get(corsWithOptions, allDrivers);
router.route('/:id').get(corsWithOptions, getDriverInfo);
router.route('/changeDriverStatus/:driverId').post(corsWithOptions, updateDriverStatus);
module.exports = router;