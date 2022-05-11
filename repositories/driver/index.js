const Driver = absoluteRequire('models/driver');
const Document = absoluteRequire('models/document');
const ObjectId = require('mongodb').ObjectID;
exports.RegisterDriver = (userfields, password) =>
    RegisterDriver(userfields, password);

exports.InsertDriverDocument = (documents) =>
    InsertDriverDocument(documents);
exports.getDriver = (driverId) =>
    getDriver(driverId);
exports.getAllDrivers = () =>
    getAllDrivers();
exports.verifyDriverStatus = (driverId, status) =>
    verifyDriverStatus(driverId, status);

async function RegisterDriver(driverfields, password) {
    try {
        driverfields.status = 'pending';
        const UserResponse = await Driver.register(new Driver(driverfields), password);
        let driverInfo = Driver.find({ email_id: driverfields.email_id });

        return driverInfo;
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function InsertDriverDocument(documents) {
    try {

        let driverEmail = { email_id: documents.driver_email }
        let driverDoc = {
            driving_licence: documents.driving_licence,
            vehicle_insurance: documents.vehicle_insurance,
            aadhar_card: documents.aadhar_card,
            pan_card: documents.pan_card,
            aadhar_number: documents.aadhar_no,
            pan_card_number: documents.pan_card_number,
        };

        const docInfo = await Document.create(driverDoc, async function (err, res) {
            if (err) {
                console.log(err);
                throw err;
            }
            let document_id = { document_id: Object(res.id) };
            try {


                await Driver.updateOne(driverEmail, document_id, async function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(res);
                    console.log("1 document updated");

                });




            } catch (err) {
                console.log(err);
            }

        });

        let driverInfo = await Driver.findOne({ email_id: documents.email_id }).populate({
            path: "document_id",

        })
        console.log("driver info: " + driverInfo);

        return;

    } catch (err) {
        console.log(err);
        return err;
    }
}
async function getDriver(driverId) {
    try {

        let userInfo = await Driver.findById(ObjectId(driverId)).populate({
            path: "document_id"
        })
            .then(driverInfo => {
                return driverInfo;
            })
            .catch(err => {
                console.log(err);
            });
        return userInfo
    } catch (err) {
        return err;
    }
}
async function getAllDrivers() {
    try {
        console.log("check1")
        let driverInfo = await Driver.find().populate({
            path: "document_id",

        })
        return driverInfo
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function verifyDriverStatus(driverId, status) {
    try {

        let driverIdInfo = { _id: Object(driverId) };
        let statusUpdate = { status: status };
        await Driver.updateOne(driverIdInfo, statusUpdate, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
            console.log("1 document updated");

        });
        let driverUpdatedInfo = await Driver.findById(ObjectId(driverId)).populate({
            path: "document_id"
        })
            .then(driverInfo => {
                return driverInfo;
            })
            .catch(err => {
                console.log(err);
            });
        return driverUpdatedInfo
    } catch (err) {
        return err;
    }
}