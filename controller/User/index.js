
const {
    RegisterUser,

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

async function SignUp(req, res, next) {

    const { password } = req.body;
    delete req.body.password;
    try {
        const isRegister = await RegisterUser(req.body, password);

        res.status(200).json({
            message: "Successfully inserted the data."
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function LogIn(req, res, next) {
    verifyUserLogin(req, res);
}
