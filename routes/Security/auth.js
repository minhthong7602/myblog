var express = require('express');
var router = express.Router();
var path = require('path');
module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
         res.sendFile('unauth.html', { root: './views/Admin' });
    });

    
    router.get('/registererr', function(req, res){
         res.sendFile('register_err.html', { root: './views/Admin' });
    });

    router.get('/registersuc', function(req, res){
         res.sendFile('register_suc.html', { root: './views/Admin' });
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/admin/',
        failureRedirect: '/auth/failure'
    }));

    router.get('/login', function(req, res) {
        res.sendFile('login.html', { root: './views/Admin' });
  //      res.sendFile('views/Admin/login.html');
    });

    router.get('/signup', function(req, res) {
          res.sendFile('register.html', { root: './views/Admin' });
    });

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/registersuc',
        failureRedirect: '/auth/registererr'
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        req.session.user = {};
        res.redirect('/auth/unauthenticate');
    });

    router.get('/unauthenticate', function(req, res) {
         res.send('Bạn vui lòng đăng nhập trước');
    });

    return router;

}