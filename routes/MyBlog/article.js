var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = mongoose.model('Article');

router.use(function (req, res, next) {
    if (!(req.isAuthenticated() && req.session.user.role == "admin")) {
        return res.redirect('/auth/login');
    };
    next();
});

router.get('/', function (req, res) {
    var keyword = req.query.keyword;
    var page = req.query.page;
    var pageSize = req.query.pageSize;
    var category = req.query.category;
    var data = {};
    Articles.count({}, function (err, count) {
        if (!err) {
            data.totalCount = parseInt(count);
            if (category != '') {
                if (keyword != '') {
                    Articles.find({ 'name': new RegExp(keyword, "i"), 'category' : category }).limit(parseInt(pageSize)).skip(parseInt(page * pageSize)).exec(function (err, articles) {
                        if (err) {
                            res.end(JSON.stringify({ data: false }));
                        } else {
                            data.Items = articles;
                            res.end(JSON.stringify(data));
                        }
                    });
                } else {
                    Articles.find({'category' : category}).limit(parseInt(pageSize)).skip(parseInt(page * pageSize)).exec(function (err, articles) {
                        if (err) {
                            res.end(JSON.stringify({ data: false }));
                        } else {
                            data.Items = articles;
                            res.end(JSON.stringify(data));
                        }
                    });
                }
            } else {
                if (keyword != '') {
                    Articles.find({ 'name': new RegExp(keyword, "i") }).limit(parseInt(pageSize)).skip(parseInt(page * pageSize)).exec(function (err, articles) {
                        if (err) {
                            res.end(JSON.stringify({ data: false }));
                        } else {
                            data.Items = articles;
                            res.end(JSON.stringify(data));
                        }
                    });
                } else {
                    Articles.find().limit(parseInt(pageSize)).skip(parseInt(page * pageSize)).exec(function (err, articles) {
                        if (err) {
                            res.end(JSON.stringify({ data: false }));
                        } else {
                            data.Items = articles;
                            res.end(JSON.stringify(data));
                        }
                    });
                }
            }

        } else {
            res.end(JSON.stringify({ data: false }));
        }
    });

});

router.get("/getbyid", function (req, res) {
    var _id = req.query.id;
    Articles.findOne({ '_id': _id }, function (err, article) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify(article));
        }
    });
});

router.put('/update', function (req, res) {
    var article = {};
    article._id = req.body._id;
    article.name = req.body.name;
    article.article_seo = req.body.article_seo;
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;
    article.status = req.body.status;
    article.category = req.body.category;
    article.home_article = req.body.home_article;
    Articles.update({ '_id': article._id }, {
        $set: {
            name: article.name,
            article_seo: article.article_seo, title: article.title,
            description: article.description, content: article.content,
            status: article.status, category: article.category,
            home_article : article.home_article
        }
    }, function (err) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify({ data: true }));
        }
    });
});

router.post('/create', function (req, res) {
    var article = new Articles();
    article.name = req.body.name;
    article.article_seo = req.body.article_seo;
    article.title = req.body.title;
    article.description = req.body.description;
    article.content = req.body.content;
    article.status = req.body.status;
    article.category = req.body.category;
    article.home_article = req.body.home_article;
    article.save(function (err) {
        if (!err) {
            res.end(JSON.stringify({ data: true }));
        } else {
            res.end(JSON.stringify({ data: false }));
        }
    });
});

module.exports = router;