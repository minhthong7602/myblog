var express = require('express');
var router = express.Router();
var filehelper = require('../../common/filehelper');
var fs = require('fs');
router.use(function (req, res, next) {
    if (!(req.isAuthenticated() && req.session.user.role == "admin")) {
        return res.redirect('/auth/login');
    };
    next();
});

router.get('/', function (req, res) {
    filehelper.ShowListFile('D:\\MyBlog\\public\\images', function (files) {
        res.end(JSON.stringify(files));
    });
});

router.delete('/delete/:path', function (req, res) {
    var path = req.params.path;
    filehelper.DeleteFile(path, function (result) {
        res.end(result);
    });
});

router.get('/download/:img', function (req, res) {
    var img = req.params.img;
    var imageDir = 'D:\\MyBlog\\public\\images\\' + img;
    fs.readFile(imageDir, function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
});


module.exports = router;