var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    name : String,
    article_seo : String,
    title : String,
    description : String,
    category : String,
    content : String,
    created_at : {type : Date, default : new Date()},
    views_count : {type : Number, default : 0},
    status : Boolean,
    home_article : Boolean
});

mongoose.model('Article', articleSchema);