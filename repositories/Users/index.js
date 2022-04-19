const User = absoluteRequire('models/user');
const { sentOTPVerificaiton } = absoluteRequire('modules/nodemailer');

// eslint-disable-next-line prettier/prettier
const { getMessage } = absoluteRequire(
    'modules/utilis/Email'
);

exports.RegisterUser = (userfields, password) =>
    RegisterUser(userfields, password);


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
        return UserResponse;
    } catch (err) {
        return err;
    }
}