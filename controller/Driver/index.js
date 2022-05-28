let streamifier = require('streamifier');

const {
    RegisterDriver,
    InsertDriverDocument,
    getDriver,
    getAllDrivers,
    verifyDriverStatus,
    insertDriverVehicle,
    DriverUpdate,
    deleteDriver,
    deleteVehicle,
    documentUpdate,
    getDriverByEmail,
    otpSend,
    verifyOtp,
    registerLoginGoogle,
    getDriverByPhone,
    insertBankDetails
} = absoluteRequire('repositories/driver');
const {
    verifyDriverLogin,
    verifyDriverGoogleLogin,
    verifyDriverwithManualMobileLogin
} = absoluteRequire('controller/Driver_Auth');
const {
    initializeCloudinary,
} = absoluteRequire('modules/utilis/cloudinary');



exports.SignUpDriver = (req, res, next) => {
    SignUpDriver(req, res, next);
};

exports.driverDocumentsUpload = (req, res, next) => {
    driverDocumentsUpload(req, res, next);
};

exports.driverLogin = (req, res, next) => {
    driverLogin(req, res, next);
};
exports.getDriverInfo = (req, res, next) => {
    getDriverInfo(req, res, next);
};
exports.allDrivers = (req, res, next) => {
    allDrivers(req, res, next);
};
exports.updateDriverStatus = (req, res, next) => {
    updateDriverStatus(req, res, next);
};
exports.addDriverVehicle = (req, res, next) => {
    addDriverVehicle(req, res, next);
};
exports.driverDelete = (req, res, next) => {
    driverDelete(req, res, next);
};
exports.vehicleDelete = (req, res, next) => {
    vehicleDelete(req, res, next);
};
exports.checkDriverExist = (req, res, next) => {
    checkDriverExist(req, res, next);
};
exports.globalImageUpload = (req, res, next) => {
    globalImageUpload(req, res, next);
};
exports.sendOtp = (req, res, next) => {
    sendOtp(req, res, next);
};
exports.otpVerify = (req, res, next) => {
    otpVerify(req, res, next);
};
exports.socialLoginRegister = (req, res, next) => {
    socialLoginRegister(req, res, next);
};

exports.driverMobileRegister = (req, res, next) => {
    driverMobileRegister(req, res, next);
};


const fs = require('fs');


async function SignUpDriver(req, res, next) {
    try {
        let isRegisterDriver, msg;
        console.log(req.body);
        if (req.body.id) {
            isRegisterDriver = await DriverUpdate(req.body);
            msg = "Successfully updated the driver info.";
        } else {
            const { password } = req.body;
            delete req.body.password;
            isRegisterDriver = await RegisterDriver(req.body, password);
            msg = "Successfully inserted the driver info.";
        }

        res.status(200).json({
            message: msg,
            data: isRegisterDriver
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function driverDocumentsUpload(req, res, next) {
    try {
        let cloudinary = await initializeCloudinary();
        let documents = {};
        if (req.files && req.files.driving_licence) {
            let fileInfo = req.files.driving_licence.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            // await fs.writeFile(`public/driver_ documents/driving_licence${random_number}.${extension}`, req.files.driving_licence.data, err => {
            //     if (err) {
            //         console.error(err);
            //     }
            //     // file written successfully
            // });
            let uploadFromBuffer = (buffer) => {

                return new Promise((resolve, reject) => {

                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "driver_doc"
                        },
                        (error, result) => {

                            if (result) {
                                resolve(result);
                            } else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });

            };

            let result = await uploadFromBuffer(req.files.driving_licence.data);
            console.log(result.url);
            documents.driving_licence = result.url;
        }
        if (req.files && req.files.vehicle_insurance) {
            let fileInfo = req.files.vehicle_insurance.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            let uploadFromBuffer = (buffer) => {

                return new Promise((resolve, reject) => {

                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "driver_doc"
                        },
                        (error, result) => {

                            if (result) {
                                resolve(result);
                            } else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });

            };

            let result = await uploadFromBuffer(req.files.driving_licence.data);
            console.log(result.url);

            documents.vehicle_insurance = result.url;
        }
        if (req.files && req.files.aadhar_card) {
            let fileInfo = req.files.aadhar_card.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            let uploadFromBuffer = (buffer) => {

                return new Promise((resolve, reject) => {

                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "driver_doc"
                        },
                        (error, result) => {

                            if (result) {
                                resolve(result);
                            } else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });

            };

            let result = await uploadFromBuffer(req.files.driving_licence.data);


            documents.aadhar_card = result.url;
        }
        if (req.files && req.files.pan_card) {
            let fileInfo = req.files.pan_card.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            // await fs.writeFile(`public/driver_ documents/pan_card${random_number}.${extension}`, req.files.pan_card.data, err => {
            //     if (err) {
            //         console.error(err);
            //     }
            //     // file written successfully
            // });
            let uploadFromBuffer = (buffer) => {

                return new Promise((resolve, reject) => {

                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "driver_doc"
                        },
                        (error, result) => {

                            if (result) {
                                resolve(result);
                            } else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });

            };

            let result = await uploadFromBuffer(req.files.driving_licence.data);


            documents.pan_card = result.url;


        }

        if (req.body.aadhar_no) {
            documents.aadhar_number = req.body.aadhar_no;
        }
        if (req.body.pan_card_number) {
            documents.pan_card_number = req.body.pan_card_number;
        }
        if (req.body.driver_email) {
            documents.driver_email = req.body.driver_email;
        }

        if (req.body.documentId) {
            console.log(documents, ", ", req.body.documentId);
            await documentUpdate(documents, req.body.documentId);
            res.status(200).json({
                message: "Successfully updated the documents.",

            })
        }
        else {
            await InsertDriverDocument(documents);
            res.status(200).json({
                message: "Successfully uploaded the documents.",

            })

        }

    } catch (err) {
        next(err);
    }
}

async function socialLoginRegister(req, res, next) {
    try {
        if (!req.body.email || req.body.email === '') {
            res.status(400).json({
                status: 400,
                message: "Email is mandatory",
            });
        }
        let driverInfo = await getDriverByEmail(req.body.email);
        if (driverInfo) {
            let token = await verifyDriverGoogleLogin(driverInfo);

            if (token) {

                res.status(200).json({
                    status: 200,
                    token: token,
                    message: "found the driver.",
                    data: driverInfo

                });
            }
            else {

                res.status(400).json({
                    status: 400,
                    message: "Driver is not register with gmail",
                });
            }
        }
        else {
            console.log('controler check');
            await registerLoginGoogle(req.body).then(async (val) => {

                if (req.body.upi_id || req.body.account_holder || req.body.ifsc_code) {
                    await insertBankDetails(req.body).then(async (bankDetals) => {
                        let token = await verifyDriverGoogleLogin(bankDetals);
                        if (token) {
                            res.status(200).json({
                                status: 200,
                                token: token,
                                message: "Successfully created the driver.",
                                data: bankDetals

                            });
                        }
                        else {

                            res.status(400).json({
                                status: 400,
                                message: "Driver is not register with gmail",
                            });
                        }

                    });
                }
                else {
                    let token = await verifyDriverGoogleLogin(val);
                    res.status(200).json({
                        message: "Successfully created the driver.",
                        token: token,
                        data: val

                    });
                }

            }).catch(err => {
                console.log(err);
            });





        }
    } catch (err) {
        next(err);
    }
}
async function driverMobileRegister(req, res, next) {
    try {
        //this is if registering manually without google.
        if (!req.body.email || req.body.email === '') {
            res.status(400).json({
                status: 400,
                message: "Email is mandatory",
            });
        }
        let driverInfo = await getDriverByEmail(req.body.email);
        if (driverInfo) {
            let token = await verifyDriverwithManualMobileLogin(driverInfo);
            if (token) {

                res.status(200).json({
                    status: 200,
                    token: token,
                    message: "found the driver.",
                    data: driverInfo

                });
            }
        }
        else {
            await registerLoginGoogle(req.body).then(async (val) => {

                if (req.body.upi_id || req.body.account_holder || req.body.ifsc_code) {
                    await insertBankDetails(req.body).then(async (bankDetals) => {
                        let token = await verifyDriverwithManualMobileLogin(bankDetals);
                        if (token) {
                            res.status(200).json({
                                status: 200,
                                token: token,
                                message: "Successfully created the driver.",
                                data: bankDetals

                            });
                        }
                    });
                }
                else {
                    let token = await verifyDriverwithManualMobileLogin(val);
                    res.status(200).json({
                        message: "Successfully created the driver.",
                        token: token,
                        data: val

                    });
                }

            }).catch(err => {
                console.log(err);
            });
        }
    } catch (err) {
        next(err);
    }
}
async function driverDelete(req, res, next) {
    try {
        const { driverId } = req.params;
        await deleteDriver(driverId);
        res.status(200).json({
            message: "Successfully deleted the driver."
        });
    } catch (err) {
        next(err);
    }
}
async function vehicleDelete(req, res, next) {
    try {
        const { vehicleId } = req.params;
        await deleteVehicle(vehicleId);
        res.status(200).json({
            message: "Successfully deleted the vehicle."
        });
    } catch (err) {
        next(err);
    }
}
async function addDriverVehicle(req, res) {
    try {

        let response = await insertDriverVehicle(req.body);

        res.status(200).json({
            message: "Successfully inserted the vehicle."
        });

    } catch (err) {
        next(err);
    }
}
async function getDriverInfo(req, res) {
    try {

        const { id } = req.params;
        let response = await getDriver(id);

        res.status(200).json({
            message: "Successfully found the Driver.",
            data: response
        })

    } catch (err) {
        next(err);
    }
}

async function checkDriverExist(req, res, next) {
    try {

        let response;
        if (req.query.phone) {
            response = await getDriverByPhone(req.query.phone);
        }
        if (req.query.email_id) {
            response = await getDriverByEmail(req.query.email_id);
        }
        if (response) {
            res.status(200).json({
                message: "Driver Successfully Found",
                driverExist: true
            })
        } else {
            res.status(200).json({
                message: "Driver Not Found",
                driverExist: false
            });

        }

    } catch (err) {
        next(err)
    }
}
async function globalImageUpload(req, res, next) {
    try {
        let images = [];
        let cloudinary = await initializeCloudinary();
        for (let img of req.files.image) {
            let uploadFromBuffer = (buffer) => {

                return new Promise((resolve, reject) => {

                    let cld_upload_stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "driver_doc"
                        },
                        (error, result) => {

                            if (result) {
                                resolve(result);
                            } else {
                                console.log(error);
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
                });

            };

            let result = await uploadFromBuffer(img.data);
            images.push(result.url);
            console.log(result);
        }



        res.status(200).json({
            message: "Successfully Uploaded the images.",
            data: images
        })
    } catch (err) {
        next(err);
    }
}

async function allDrivers(req, res) {
    try {

        let response = await getAllDrivers();

        res.status(200).json({
            message: "Successfully found the Drivers.",
            data: response
        })

    } catch (err) {
        next(err);
    }
}

async function sendOtp(req, res) {
    try {
        await otpSend(req.query.phone);
        res.status(200).json({
            message: "Otp sent successfully",

        })
    } catch (err) {
        next(err);
    }
}
async function otpVerify(req, res) {
    try {
        let otpInfo = await verifyOtp(req.body);
        if (otpInfo) {
            res.status(200).json({
                otp_valid: true
            })
        }
        else {
            res.status(200).json({
                otp_valid: false
            })
        }
    } catch (err) {
        next(err);
    }
}
async function driverLogin(req, res, next) {
    try {
        verifyDriverLogin(req, res);

    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function updateDriverStatus(req, res, next) {
    try {

        const { driverId } = req.params;
        let status = req.body.status;
        let response = await verifyDriverStatus(driverId, status);
        if (response) {
            res.status(200).json({
                message: "Successfully verified the driver.",
                data: response
            })
        }
        else {
            res.status(200).json({
                message: "Something went wrong.",

            })
        }

    } catch (err) {
        next(err);
    }
}