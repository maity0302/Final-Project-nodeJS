const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join(process.cwd(), "public/images"));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let uploadSingleFile = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('image', 5);
module.exports = {uploadSingleFile, uploadMultipleFiles};