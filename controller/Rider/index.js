
const {
    insertRider,
    getRiderById,
    getAllRiders,
    editDriver,
    deleteRider
} = absoluteRequire('repositories/rider');

exports.SignUpRider = (req, res, next) => {
    SignUpRider(req, res, next);
};
exports.riderById = (req, res, next) => {
    riderById(req, res, next);
};
exports.allRiders = (req, res, next) => {
    allRiders(req, res, next);
};
exports.riderUpdate = (req, res, next) => {
    riderUpdate(req, res, next);
};
exports.riderDelete = (req, res, next) => {
    riderDelete(req, res, next);
};
async function SignUpRider(req, res, next) {
    try {
        let riderInfo = await insertRider(req.body);

        res.status(200).json({
            status: 200,
            message: "Successfully Inserted the rider.",
            data: riderInfo
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
async function riderById(req, res, next) {
    try {

        const { riderId } = req.params;

        let riderInfo = await getRiderById(riderId);

        res.status(200).json({
            status: 200,
            message: "Successfully got the rider.",
            data: riderInfo
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
async function riderUpdate(req, res, next) {
    try {
        let riderInfo = await editDriver(req.body);

        res.status(200).json({
            status: 200,
            message: "Successfully updated the rider.",
            data: riderInfo
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
async function riderDelete(req, res, next) {
    try {
        const { riderId } = req.params;
        let riderInfo = await deleteRider(riderId);

        res.status(200).json({
            status: 200,
            message: "Successfully deleted the rider.",

        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function allRiders(req, res, next) {
    try {
        let riderInfo = await getAllRiders();

        res.status(200).json({
            status: 200,
            message: "Successfully got the Riders.",
            data: riderInfo
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}