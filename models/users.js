var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : String,
    password : String,
    created_at : {type : Date, default : Date.Now},
    role : String
});

mongoose.model('User', userSchema);