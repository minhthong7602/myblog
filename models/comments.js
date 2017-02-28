var mongoose = require('mongoose');

var commnentSchema = new mongoose.Schema({
    name : String,
    email : String,
    article : String,
    content : String,
    status : {type : Boolean, default : true},
    created_at : Date,
});

mongoose.model('Comment', commnentSchema);