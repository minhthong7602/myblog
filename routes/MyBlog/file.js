var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();


router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(function (req, res, next) {
    if (!(req.isAuthenticated() && req.session.user.role == "admin")) {
        return res.redirect('/auth/login');
    };
    next();
});

router.get('/upfile', function (req, res) {
    res.sendFile('upload.html', { root: './views/MyBlog' });
});

router.post('/upload', multipartMiddleware, function (req, res, next) {
    var file = req.files.file;

    // Tên file
    var originalFilename = file.name;

    // File type
    var fileType = file.type.split('/')[1];

    // File size
    var fileSize = file.size;

    // Đường dẫn lưu ảnh
    var pathUpload = 'D:\\MyBlog\\public\\images\\' + originalFilename;

    // Đọc nội dung file tmp
    // nếu không có lỗi thì ghi file vào ổ cứng
    fs.readFile(file.path, function (err, data) {
        if (!err) {
            fs.writeFile(pathUpload, data, function () {

                // Return anh vua upload
                res.end(originalFilename);
                return;
            });

        }
    });
});

module.exports = router;