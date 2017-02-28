var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comments = mongoose.model('Comment');

router.post('/create', function (req, res) {
    var comment = new Comments();

    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.content = req.body.content;
    comment.article = req.body.article;
    comment.created_at = new Date();
    console.log(comment.name);
    comment.save(function (err) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify({ data: true }));
        }
    });
});

router.get('/', function (req, res) {
    var article = req.query.article;
    Comments.find({ $and: [{ 'article': article }, { 'status': true }] }).limit(5).sort({ '_id': -1 }).exec(function (err, comments) {
        if (err) {
            res.end(JSON.stringify({ data: false }));
        } else {
            res.end(JSON.stringify(comments));
        }
    });
});

module.exports = router;