var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
      name : String,
      description : String,
      created_at : {type : Date, default : new Date()}
});

mongoose.model('Category', categorySchema);