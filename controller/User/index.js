
const {
    RegisterUser,
    verifyUserWithOtp
} = absoluteRequire('repositories/Users');

const {
    verifyUserLogin,
} = absoluteRequire('controller/Auth');

exports.SignUp = (req, res, next) => {
    SignUp(req, res, next);
};
exports.LogIn = (req, res, next) => {
    LogIn(req, res, next);
};
exports.verifyUser = (req, res, next) => {
    verifyUser(req, res, next);
};
async function SignUp(req, res, next) {

    const { password } = req.body;
    delete req.body.password;
    try {
        const isRegister = await RegisterUser(req.body, password);

        res.status(200).json({
            message: "Successfully inserted the data.",
            data: isRegister
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}
async function verifyUser(req, res, next) {
    try {
        const response = await verifyUserWithOtp(req.body);

        if (response.length == 0) {
            res.status(200).json({
                message: "Authentication failed, Please try again.",
                data: response
            })
        }
        res.status(200).json({
            message: "User verified successfully.",
            data: response
        })
    } catch (err) {
        next(err);
    }
}
async function LogIn(req, res, next) {
    verifyUserLogin(req, res);
}
