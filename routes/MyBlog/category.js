var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Categorys = mongoose.model('Category');

router.use(function (req, res, next) {
    if (!(req.isAuthenticated() && req.session.user.role == "admin")) {
        return res.redirect('/auth/login');
    };
    next();
});

router.post('/create', function (req, res) {
    var category = new Categorys();
    category.name = req.body.name;
    category.description = req.body.description;
    Categorys.findOne({ 'name': req.body.name }, function (err, item) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            if (item != null) {
                res.end(JSON.stringify({ data: false }));
            } else {
                category.save(function (err) {
                    if (!err) {
                        res.end(JSON.stringify({ data: true }));
                    } else {
                        res.end(JSON.stringify({ data: false }));
                    }
                });
            }
        }
    });

});

router.get('/', function (req, res) {
    var keyword = req.query.keyword;
   

    console.log(keyword);
    var data = {};
    if (keyword != '') {
        Categorys
        Categorys.find({ 'name': new RegExp(keyword, "i") }, function (err, categories) {
            if (err) {
                res.end(JSON.stringify({ data: false }));
            } else {
                res.end(JSON.stringify(categories));
            }
        });
    } else {
        Categorys.find({}, function (err, categories) {
            if (err) {
                res.end(JSON.stringify({ data: false }));
            } else {
                res.end(JSON.stringify(categories));
            }
        });
    }

});

router.get('/getbyid', function (req, res) {
    var _id = req.query._id;
    Categorys.findOne({ '_id': _id }, function (err, category) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify(category));
        }
    });
});

router.put('/update', function (req, res) {
    var _id = req.body._id;
    var name = req.body.name;
    var description = req.body.description;
    Categorys.update({ '_id': _id }, { $set: { name: name, description: description } }, function (err) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify({ data: true }));
        }
    });
});

module.exports = router;