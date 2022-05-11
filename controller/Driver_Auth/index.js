/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-var */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const jwt = require('jsonwebtoken');

const {
    jwtUserSecretKey,
    jwtConfirmRegistrationSecretKey,
    jwtTokenSecretKey,
    jwtForgotPasswordSecretKey,
} = absoluteRequire('config');
const User = absoluteRequire('models/driver');

exports.local = passport.use(
    new LocalStrategy(
        {
            usernameField: 'email_id',
        },
        User.authenticate()
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// eslint-disable-next-line prettier/prettier
exports.getToken = (user) =>
    jwt.sign(user, jwtUserSecretKey, { expiresIn: 3600 });

exports.getForgotPasswordToken = (user) =>
    jwt.sign(user, jwtForgotPasswordSecretKey, { expiresIn: 3600 });

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtUserSecretKey;

exports.jwtPassport = passport.use(
    'user_strategy',
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    })
);
opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtForgotPasswordSecretKey;

exports.jwtPassport = passport.use(
    'password_strategy',
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    })
);

exports.verifyUserFromToken = passport.authenticate('user_strategy', {
    session: false,
});
exports.verifyUserEmailRegistration = (req, res, next) => {
    if (req.user.is_verified) {
        next();
    } else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        next(err);
    }
};

exports.verifyAdmin = (req, res, next) => {
    if (req.user.is_admin && req.user.is_verified) {
        next();
    } else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        next(err);
    }
};

// eslint-disable-next-line prettier/prettier
exports.getRegistrationToken = (user) =>
    jwt.sign(user, jwtConfirmRegistrationSecretKey);

opts = {};
var tokenExtractor = (req) => {
    var token = null;
    token = req.params.jwtToken;
    return token;
};
opts.jwtFromRequest = tokenExtractor;
opts.secretOrKey = jwtConfirmRegistrationSecretKey;

exports.jwtPassport = passport.use(
    'confirm_user',
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    })
);


exports.verifyEmail = passport.authenticate('confirm_user', {
    session: false,
});
exports.verifyForgotPassword = passport.authenticate('password_strategy', {
    session: false,
});

exports.verifyUserRegistration = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true });
    });
};

exports.verifyDriverLogin = (req, res) => {
    passport.authenticate('local')(req, res, () => {
        if (req.user.status && req.user.status === 'verified') {
            const token = exports.getToken({ _id: req.user._id });
            const refreshtoken = exports.getRefreshToken({ _id: req.user._id });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, token, refreshtoken });
        } else {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: false,
                message: 'You are not verified or blocked. Please contact the administrator.',
            });
        }
    });
};



opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtTokenSecretKey;

exports.jwtPassport = passport.use(
    'token_strategy',
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });
    })
);

exports.verifyRefreshToken = passport.authenticate('token_strategy', {
    session: false,
});
// eslint-disable-next-line prettier/prettier
exports.getRefreshToken = (user) => jwt.sign(user, jwtTokenSecretKey);
