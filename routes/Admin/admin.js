var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {

      if(!(req.isAuthenticated() && req.session.user.role== "admin")) { 
           return res.redirect('/auth/login');
       };
      next();
});

router.get('/', function(req, res) {
     res.sendFile('index.html', {root :  './views/Admin'});
});

module.exports = router;