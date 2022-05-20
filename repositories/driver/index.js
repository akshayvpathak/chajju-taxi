const Driver = absoluteRequire('models/driver');
const Vehicle = absoluteRequire('models/vehicle');
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
exports.insertDriverVehicle = (data) =>
    insertDriverVehicle(data);
exports.DriverUpdate = (driverfields) =>
    DriverUpdate(driverfields);
exports.deleteDriver = (driverId) =>
    deleteDriver(driverId);
exports.deleteVehicle = (vehicleId) =>
    deleteVehicle(vehicleId);

exports.documentUpdate = (documents, documnetId) =>
    documentUpdate(documents, documnetId);
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
async function DriverUpdate(driverfields) {
    try {
        let driverObj = {};
        if (driverfields.name && driverfields.name !== '') {
            driverObj.name = driverfields.name;
        }

        if (driverfields.email_id && driverfields.email_id !== '') {
            driverObj.email_id = driverfields.email_id;
        }


        if (driverfields.phone && driverfields.phone !== '') {
            driverObj.phone = driverfields.phone;
        }

        if (driverfields.city && driverfields.city !== '') {
            driverObj.city = driverfields.city;
        }

        if (driverfields.country && driverfields.country !== '') {
            driverObj.country = driverfields.country;
        }
        await Driver.updateOne({ _id: Object(driverfields.id) }, driverObj, async function (err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);


        });
        let driverInfo = Driver.findOne({ _id: Object(driverfields.id) });

        return driverInfo;

    } catch (err) {
        return err;
    }
}

async function InsertDriverDocument(documents) {
    try {

        let driverEmail = { email_id: documents.driver_email }


        const docInfo = await Document.create(documents, async function (err, res) {
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
async function documentUpdate(documents, documnetId) {
    try {
        console.log(documents, " ,", ObjectId(documnetId));
        let docUpdate = await Document.updateOne({ _id: ObjectId(documnetId) }, documents, async function (err, res) {
            if (err) {
                console.log(err);
            }
        });
        let documentInfo = Document.findOne({ _id: ObjectId(documnetId) });
        return documentInfo;
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
async function insertDriverVehicle(data) {
    try {
        data.driver_id = new ObjectId(data.driver_id);

        const vehicleInfo = await Vehicle.create(data, async (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.id;
        });
        console.log(vehicleInfo);
        return;

    } catch (err) {
        return err;
    }
}
async function deleteDriver(driverId) {
    try {
        let driverInfo = await Driver.findById(ObjectId(driverId))
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
            });
        await Driver.deleteOne({ _id: ObjectId(driverId) }, function (err, obj) {
            if (err) throw err;
            console.log("Driver deleted");

        });
        await Document.deleteOne({ _id: ObjectId(driverInfo.document_id) }, function (err, obj) {
            if (err) throw err;
            console.log("Driver's Document deleted");

        });
        await Vehicle.deleteOne({ driver_id: ObjectId(driverId) }, function (err, obj) {
            if (err) throw err;
            console.log("Driver's Vehicle deleted");

        });
        return;
    } catch (err) {
        return err;
    }
}
async function deleteVehicle(vehicleId) {
    try {
        let vehicleInfo = await Vehicle.findById(ObjectId(vehicleId))
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
            });

        await Vehicle.deleteOne({ _id: ObjectId(vehicleId) }, function (err, obj) {
            if (err) throw err;
            console.log("Driver's Vehicle deleted");

        });
        return;
    } catch (err) {
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