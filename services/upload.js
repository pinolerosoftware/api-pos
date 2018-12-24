const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const config = require('../config');

aws.config.update({
    region: 'us-west-2',
    accessKeyId: config.ACCESSKEYID,
    secretAccessKey: config.SECRETACCESSKEY
});

const s3 = new aws.S3();

s3.listBuckets(function(err, data) { console.log(err, data); });

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
        cb(null, true)
    else
        cb(new Error('Formato no valido, Favor agregar una imagen con formato PNG o JPG'), false)
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'api-pos',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
  })


  module.exports = upload;