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
    updateDriverStatus,
    addDriverVehicle,
    driverDelete,
    vehicleDelete,
    checkDriverExist,
    globalImageUpload,
    sendOtp,
    otpVerify,
    socialLoginRegister,
    driverMobileRegister
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
router.route('/driverUpdate').post(corsWithOptions, SignUpDriver);

router.route('/driverDocumentsUpload').post(corsWithOptions, driverDocumentsUpload);
router.route('/login').post(corsWithOptions, driverLogin);
router.route('/all').get(corsWithOptions, allDrivers);
router.route('/checkDriverExist').get(corsWithOptions, checkDriverExist);
router.route('/sendOtp').get(corsWithOptions, sendOtp);
router.route('/:id').get(corsWithOptions, getDriverInfo);

router.route('/changeDriverStatus/:driverId').post(corsWithOptions, updateDriverStatus);
router.route('/addDriverVehicle').post(corsWithOptions, addDriverVehicle);
router.route('/globalImageUpload').post(corsWithOptions, globalImageUpload);
router.route('/loginRegisterGoogle').post(corsWithOptions, socialLoginRegister);
router.route('/driverRegisterMobile').post(corsWithOptions, driverMobileRegister);
router.route('/otpVerify').post(corsWithOptions, otpVerify);

router.route('/:driverId').delete(corsWithOptions, driverDelete);
router.route('/deleteVehicle/:vehicleId').delete(corsWithOptions, vehicleDelete);


module.exports = router;