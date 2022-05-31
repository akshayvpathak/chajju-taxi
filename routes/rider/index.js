const { Router } = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const { corsWithOptions } = absoluteRequire('modules/cors');

const {
    SignUpRider,
    riderById,
    allRiders
} = absoluteRequire('controller/Rider');

const router = Router();
router.use(bodyParser.json());
router.route('/getAllRiders').get(corsWithOptions, allRiders);
router.route('/:riderId').get(corsWithOptions, riderById);
router.route('/riderRegister').post(corsWithOptions, SignUpRider);


module.exports = router;