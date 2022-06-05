const { Router } = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const { corsWithOptions } = absoluteRequire('modules/cors');

const {
    SignUpRider,
    riderById,
    allRiders,
    riderUpdate,
    riderDelete
} = absoluteRequire('controller/Rider');

const router = Router();
router.use(bodyParser.json());
router.route('/getAllRiders').get(corsWithOptions, allRiders);
router.route('/:riderId').get(corsWithOptions, riderById);
router.route('/riderRegister').post(corsWithOptions, SignUpRider);
router.route('/updateRider').post(corsWithOptions, riderUpdate);
router.route('/:riderId').delete(corsWithOptions, riderDelete);


module.exports = router;