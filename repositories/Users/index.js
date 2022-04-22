const User = absoluteRequire('models/user');
const { sentOTPVerificaiton } = absoluteRequire('modules/nodemailer');
const ObjectId = require('mongodb').ObjectID;
// eslint-disable-next-line prettier/prettier
const { getMessage } = absoluteRequire(
    'modules/utilis/Email'
);

exports.RegisterUser = (userfields, password) =>
    RegisterUser(userfields, password);

exports.verifyUserWithOtp = (userInfo) =>
    verifyUserWithOtp(userInfo);
exports.getUser = (userId) =>
    getUser(userId);

exports.updateUser = (userInfo, user_id) =>
    updateUser(userInfo, user_id);
async function RegisterUser(userfields, password) {
    try {
        let otp = Math.floor(1000 + Math.random() * 9000);
        userfields.otp = otp;
        const html = `<p>The verification OTP of user is ${otp}</p>`;
        let email_id = userfields.email_id;
        const message = await getMessage(
            'taxichajju@gmail.com',
            email_id,
            'User Verification',
            html
        );
        await sentOTPVerificaiton(message);
        const UserResponse = await User.register(new User(userfields), password);
        let userInfo = User.find({ email_id: email_id });

        return userInfo;
    } catch (err) {
        return err;
    }
}

async function verifyUserWithOtp(userInfo) {
    try {

        let reponse = await User.find({ email_id: userInfo.email_id, otp: userInfo.otp });
        console.log(reponse);
        if (reponse && reponse.length > 0) {
            let from = { email_id: userInfo.email_id };
            let to = { $set: { is_verified: true } };
            await User.updateOne(from, to, function (err, res) {
                if (err) throw err;
                console.log("Verified");

            });
        }
        reponse = await User.find({ email_id: userInfo.email_id, otp: userInfo.otp });
        return reponse;
    } catch (err) {
        return err;
    }
}

async function getUser(userId) {
    try {

        let userInfo = await User.findById(ObjectId(userId))
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            });
        return userInfo
    } catch (err) {
        return err;
    }
}

async function updateUser(userInfo, user_id) {
    try {
        console.log("USER INFO ", userInfo, " id ", user_id);
        let user = {};

        if (userInfo.fullname) {
            user.fullname = userInfo.fullname;
        }
        if (userInfo.phone_number) {
            user.phone_number = userInfo.phone_number;
        }

        let userId = { _id: ObjectId(user_id) };
        console.log("UPDATE USER ", user);
        await User.updateOne(userId, user, function (err, res) {
            if (err) throw err;
            console.log("1 user updated");

        });
        return "User Updated";
    } catch (err) {
        return err;
    }
}