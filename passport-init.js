var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

var mongoose = require('mongoose');
var Users = mongoose.model('User');
module.exports = (passport) => {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            console.log('deserializing user:', user.username);
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
        function (req, username, password, done) {
            console.log(username + ' ' + password);

            Users.findOne({ 'username': username }, function (err, user) {
                if (err) {
                    console.log('Connect DB faild');
                }

                if (!user) {
                    console.log("Not found user");
                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    console.log("Login faild");
                    return done(null, false);
                }

                console.log('successfully signed in');
                req.session.user = user;
                return done(null, user);

            });
        }));

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true // allows us to pass back the entire request to the callback)
    }, function (req, username, password, done) {
        Users.findOne({ 'username': username }, function (err, user) {
            // In case of any error, return using the done method
            if (err) {
                console.log('Error in SignUp: ' + err);
                return done(err);
            }
            // already exists
            if (user) {
                console.log('User already exists with username: ' + username);
                return done(null, false);
            } else {
                // if there is no user, create the user
                var newUser = new Users();

                // set the user's local credentials
                newUser.username = username;
                newUser.password = createHash(password);
                newUser.role = 'client';

                // save the user
                newUser.save(function (err) {
                    if (err) {
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    console.log(newUser.username + ' Registration successful');
                    return done(null, newUser);
                });
            }
        });
    }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

}