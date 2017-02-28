var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var authenticate = require('./routes/Security/auth')(passport);
var mongoose = require('mongoose');

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/MyBlog");

//Initialize models
require('./models/users');
require('./models/category');
require('./models/article');
require('./models/comments');
var port = process.env.PORT || 3000;
var app = express();

app.use('/views', express.static('./views'));
app.use('/web', express.static('./web'));
app.use('/Assets', express.static('./Assets'));
app.use('/app', express.static('./app'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
       secret : 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('./public'));

//Add Controller
var admin = require('./routes/Admin/admin');

// Initialize passport
var initPassport = require('./passport-init');
initPassport(passport);
// Require Controller
var category = require('./routes/MyBlog/category');
var image = require('./routes/MyBlog/image');
var file = require('./routes/MyBlog/file');
var article = require('./routes/MyBlog/article');
var article_home = require('./routes/Home/article-home');
var comments = require('./routes/Home/comments');
//Mapping url
app.use('/auth', authenticate);
app.use('/admin', admin);
app.use('/category', category);
app.use('/image', image);
app.use('/file', file);
app.use('/article', article);
app.use('/article-home', article_home);
app.use('/comments', comments);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);

// });

// // error handler
// app.use(function(err, req, res, next) {
 
//   // render the error page
//   res.status(err.status || 500);
//   res.end('error');

// });

app.get('/', (req, res)=> {
   res.sendFile(__dirname + '/web/index.html');
});

app.get('/article', (req, res)=> {
   res.sendFile(__dirname + '/test.html');
});


app.listen(port, ()=> {
    console.log(`Server is listening on port  ${port}`);
});

