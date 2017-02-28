var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Articles = mongoose.model('Article');

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

router.get("/getbyseo", function (req, res) {
    var article_seo = req.query.seo;
    Articles.findOne({$and : [{ 'article_seo': article_seo}, {'status' : 'true' }]}, function (err, article) {
        if (err) {         
            res.end(JSON.stringify({ data: false }));
        } else {
            var views_count = article.views_count;
            Articles.update({'article_seo': article_seo}, {$set : {'views_count' : views_count + 1}}, function(err) {
                
            });
            res.end(JSON.stringify(article));
        }
    });
});

router.get("/gethomearticle", function (req, res) {
    Articles.findOne({$and : [{ 'home_article': true}, {'status' : 'true' }]}, function (err, article) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify(article));
        }
    });
});


router.get('/getbycategory', function(req, res) {
    var _id = req.query.id;
    Articles.find({$and : [{'category' : _id } , {'status' : 'true' }]}).limit(10).sort({'created_at' : -1}).exec(function(err, articles) {
         if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify(articles));
        }
    });
});

module.exports = router;