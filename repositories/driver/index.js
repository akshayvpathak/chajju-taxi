const Driver = absoluteRequire('models/driver');
const Vehicle = absoluteRequire('models/vehicle');
const Document = absoluteRequire('models/document');
const Otp = absoluteRequire('models/otp');
const BankDetails = absoluteRequire('models/bank_account_details');

const unirest = require("unirest");
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
exports.getDriverByEmail = (emailId) =>
    getDriverByEmail(emailId);
exports.getDriverByPhone = (phone) =>
    getDriverByPhone(phone);
exports.otpSend = (phone) =>
    otpSend(phone);
exports.verifyOtp = (data) =>
    verifyOtp(data);
exports.registerLoginGoogle = (data) =>
    registerLoginGoogle(data);
exports.insertBankDetails = (data) =>
    insertBankDetails(data);
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
async function getDriverByEmail(emailId) {
    try {

        let userInfo = await Driver.findOne({ email_id: emailId }).populate({
            path: "document_id"
        }).populate({
            path: "bank_ac_id"
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
async function getDriverByPhone(phone) {
    try {

        let userInfo = await Driver.findOne({ phone: phone }).populate({
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
async function otpSend(phone) {
    try {
        console.log(phone);
        var otp = Math.floor(1000 + Math.random() * 9000);
        var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

        req.headers({
            "authorization": "NDVghc49iZKbldXzv2HTa8GtqnjIBYWA10CPSOekJr7EuowpM6G4S9pMuJgC7FPEi80ydLbjqDRVoKYw"
        });

        req.form({
            "variables_values": otp,
            "route": "otp",
            "numbers": phone,
        });

        req.end(function (res) {
            if (res.error) {
                console.log(res.error);
            }

            console.log(res.body);
        });
        let otpData = {
            phone: phone,
            otp: otp
        };

        const otpInfo = await Otp.create(otpData, async (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.id;
        });



        return;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function verifyOtp(data) {
    try {
        console.log(data);
        let otpInfo = await Otp.findOne({ phone: data.phone, otp: data.otp });;

        return otpInfo;

    } catch (err) {
        return err;
    }
}

async function registerLoginGoogle(data) {
    try {
        console.log('check ', data);
        let driverData = {};
        let documentData = {};
        let bankAc = {};
        if (data.name) {
            driverData.name = data.name;
        }
        if (data.email) {
            driverData.email_id = data.email;
        }
        if (data.phone) {
            driverData.phone = data.phone;
        }
        if (data.token_id) {
            driverData.google_id = data.token_id;
        }
        if (data.pan_no) {
            documentData.pan_card_number = data.pan_no;
        }
        if (data.aadhar_no) {
            documentData.aadhar_number = data.aadhar_no;
        }

        if (data.aadhar_link) {
            documentData.aadhar_card = data.aadhar_link;
        }

        return new Promise(async (resolve, reject) => {
            await Document.create(documentData, async function (err, doc) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                driverData.document_id = doc.id;
                await Driver.create(driverData, async function (err, res) {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    console.log("1 record inserted");
                    let driverInformation = await getDriverByEmail(data.email);
                    console.log(driverInformation);
                    resolve(driverInformation);

                });

            });

        });


    } catch (err) {
        return err;
    }
}
async function insertBankDetails(data) {
    try {
        return new Promise(async (resolve, reject) => {
            let bankAc = {};
            if (data.upi_id) {
                bankAc.upi_id = data.upi_id;
            }
            if (data.account_holder) {
                bankAc.account_holder = data.account_holder;
            }
            if (data.ifsc_code) {
                bankAc.ifsc_code = data.ifsc_code;
            }
            if (data.paytm_number) {
                bankAc.paytm_number = data.paytm_number;
            }
            if (data.account_no) {
                bankAc.account_number = data.account_no;
            }
            await BankDetails.create(bankAc, async function (err, bankInfo) {
                if (err) {
                    console.log(err);
                    throw err;
                }

                await Driver.updateOne({ email_id: data.email }, { bank_ac_id: ObjectId(bankInfo.id) }, async function (err, newDriver) {
                    if (err) {
                        console.log(err);
                    }


                    console.log("1 record updated");
                    let driverInformation = await getDriverByEmail(data.email);

                    resolve(driverInformation);
                });

            });
        });
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