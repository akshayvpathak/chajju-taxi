const User = absoluteRequire('models/user');
const { sentOTPVerificaiton } = absoluteRequire('modules/nodemailer');

// eslint-disable-next-line prettier/prettier
const { getMessage } = absoluteRequire(
    'modules/utilis/Email'
);

exports.RegisterUser = (userfields, password) =>
    RegisterUser(userfields, password);

exports.verifyUserWithOtp = (userInfo) =>
    verifyUserWithOtp(userInfo);

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