const {
    RegisterDriver,
    InsertDriverDocument,
    getDriver,
    getAllDrivers,
    verifyDriverStatus
} = absoluteRequire('repositories/Driver');
const {
    verifyDriverLogin,
} = absoluteRequire('controller/Driver_Auth');

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
const fs = require('fs');

async function SignUpDriver(req, res, next) {

    const { password } = req.body;
    delete req.body.password;
    try {
        console.log(req.body);
        const isRegisterDriver = await RegisterDriver(req.body, password);

        res.status(200).json({
            message: "Successfully inserted the data.",
            data: isRegisterDriver
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function driverDocumentsUpload(req, res, next) {
    try {

        let documents = {};
        if (req.files.driving_licence) {
            let fileInfo = req.files.driving_licence.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            await fs.writeFile(`public/driver_ documents/driving_licence${random_number}.${extension}`, req.files.driving_licence.data, err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
            documents.driving_licence = `public/driver_ documents/driving_licence.${extension}`;
        }
        if (req.files.vehicle_insurance) {
            let fileInfo = req.files.vehicle_insurance.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            await fs.writeFile(`public/driver_ documents/vehicle_insurance${random_number}.${extension}`, req.files.vehicle_insurance.data, err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
            documents.vehicle_insurance = `public/driver_ documents/vehicle_insurance.${extension}`;
        }
        if (req.files.aadhar_card) {
            let fileInfo = req.files.aadhar_card.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            await fs.writeFile(`public/driver_ documents/aadhar_card${random_number}.${extension}`, req.files.aadhar_card.data, err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
            documents.aadhar_card = `public/driver_ documents/aadhar_card.${extension}`;
        }
        if (req.files.pan_card) {
            let fileInfo = req.files.pan_card.mimetype.split('/');
            let extension = fileInfo[1];
            let timestamp = new Date().toISOString().replace(/[-:.]/g, "");
            let random = ("" + Math.random()).substring(2, 8);
            let random_number = timestamp + random;
            await fs.writeFile(`public/driver_ documents/pan_card${random_number}.${extension}`, req.files.pan_card.data, err => {
                if (err) {
                    console.error(err);
                }
                // file written successfully
            });
            documents.pan_card = `public/driver_ documents/pan_card.${extension}`;
        }

        if (req.body.aadhar_no) {
            documents.aadhar_no = req.body.aadhar_no;
        }
        if (req.body.pan_card_number) {
            documents.pan_card_number = req.body.pan_card_number;
        }
        if (req.body.driver_email) {
            documents.driver_email = req.body.driver_email;
        }

        await InsertDriverDocument(documents);
        res.status(200).json({
            message: "Successfully uploaded the documents.",

        })
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