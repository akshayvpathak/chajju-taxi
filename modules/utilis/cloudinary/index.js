let cloudinary = require('cloudinary').v2;

exports.initializeCloudinary = () => {
    cloudinary.config({
        cloud_name: 'dznctq8mm',
        api_key: '961372586614132',
        api_secret: 'HBAGZWKpyCPGGzCDFlKLMS_tc_k',
        secure: true
    });
    return cloudinary;
};