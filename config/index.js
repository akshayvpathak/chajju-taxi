/* eslint-disable operator-linebreak */
exports.directory = `${__dirname}/../`;
exports.whitelist = process.env.WHITELIST;
exports.mongodbURL = process.env.CONNECTION_URL;
exports.jwtUserSecretKey = process.env.JWT_SECRET_KEY;
exports.jwtForgotPasswordSecretKey = process.env.JWT_SECRET_KEY;
exports.jwtTokenSecretKey = process.env.JWT_SECRET_KEY;
exports.jwtConfirmRegistrationSecretKey =
    process.env.JWT_SECRET_KEY;
exports.oAuthRefreshToken = process.env.OAUTH_REFRESH_TOKEN;
