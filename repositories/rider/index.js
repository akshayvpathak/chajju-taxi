const Rider = absoluteRequire('models/rider');
const Location = absoluteRequire('models/location');
const ObjectId = require('mongodb').ObjectID;
exports.insertRider = (data) =>
    insertRider(data);
exports.getRiderById = (riderId) =>
    getRiderById(riderId);
exports.getAllRiders = () =>
    getAllRiders();
exports.editDriver = (data) =>
    editDriver(data);
exports.deleteRider = (riderId) =>
    deleteRider(riderId);

async function insertRider(data) {
    try {
        let riderInfo = {};
        if (data.name) {
            riderInfo.name = data.name;
        }
        if (data.email) {
            riderInfo.email_id = data.email;
        }
        if (data.phone) {
            riderInfo.phone = data.phone;
        }
        if (data.city) {
            riderInfo.city = data.city;
        }
        if (data.country) {
            riderInfo.country = data.country;
        }
        if (data.image) {
            riderInfo.image = data.image;
        }
        let locationInfo = {};
        if (data.latitude) {
            locationInfo.latitude = data.latitude;
        }
        if (data.longitude) {
            locationInfo.longitude = data.longitude;
        }

        let locationInformation;

        if (locationInfo && Object.keys(locationInfo).length > 0) {

            locationInformation = await Location.create(locationInfo);

        }
        let RiderResponse;

        if (locationInformation) {
            riderInfo.location_id = ObjectId(locationInformation.id)

        }
        riderInfo.status = 'Active';
        RiderResponse = await Rider.register(new Rider(riderInfo), data.password);
        let riderInformation = Rider.findOne({ email_id: data.email }).populate({
            path: "location_id",
        });

        return riderInformation;

    } catch (error) {
        console.log(error);
        return error;
    }
}
async function editDriver(data) {
    try {
        let riderInfo = {};

        if (data.name) {
            riderInfo.name = data.name;
        }
        if (data.city) {
            riderInfo.city = data.city;
        }
        if (data.country) {
            riderInfo.country = data.country;
        }
        let locationInfo = {};
        if (data.latitude) {
            locationInfo.latitude = data.latitude;
        }
        if (data.longitude) {
            locationInfo.longitude = data.longitude;
        }

        let riderInformation = await Rider.findOne({ _id: ObjectId(data.id) });

        if (locationInfo && Object.keys(locationInfo).length > 0) {
            if (riderInformation && riderInformation.location_id) {
                console.log('check update');
                await Location.updateOne({ _id: ObjectId(riderInformation.location_id) }, locationInfo);
            }
            else {
                console.log('check create')
                let locationInformation = await Location.create(locationInfo);
                console.log(locationInformation);
                riderInfo.location_id = ObjectId(locationInformation.id)
            }

        }
        await Rider.updateOne({ _id: ObjectId(data.id) }, riderInfo);

        riderInformation = await Rider.findOne({ _id: ObjectId(data.id) }).populate({
            path: "location_id",
        });
        return riderInformation;

    } catch (err) {
        console.log(err);
        return err;
    }
}
async function getRiderById(riderId) {
    try {
        let riderInformation = Rider.findOne({ _id: ObjectId(riderId) });

        return riderInformation;
    } catch (err) {
        return err;
    }
}
async function deleteRider(riderId) {
    try {
        let riderInformation = await Rider.findOne({ _id: ObjectId(riderId) });
        if (riderInformation && riderInformation.location_id) {
            await Location.deleteOne({ _id: ObjectId(riderInformation.location_id) });
        }
        await Rider.deleteOne({ _id: ObjectId(riderId) });
        return;
    } catch (err) {
        return err;
    }
}
async function getAllRiders() {
    try {
        let riderInformation = Rider.find().populate({
            path: "location_id",
        });
        return riderInformation;
    } catch (err) {
        return err;
    }
}