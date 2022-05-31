const Rider = absoluteRequire('models/rider');
const Location = absoluteRequire('models/location');
const ObjectId = require('mongodb').ObjectID;
exports.insertRider = (data) =>
    insertRider(data);
exports.getRiderById = (riderId) =>
    getRiderById(riderId);
exports.getAllRiders = () =>
    getAllRiders();
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

async function getRiderById(riderId) {
    try {
        let riderInformation = Rider.findOne({ _id: ObjectId(riderId) }).populate({
            path: "location_id",
        });
        return riderInformation;
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