/**
 * Created by DylanWight on 5/30/17.
 */

function UserService (app) {

    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var LocalStrategy = require('passport-local').Strategy;
    const CommonService = require('./common.service.server');
    const UserModel = require("../model/user/user.model.server")();
    var UserService = new CommonService(app, UserModel, "user");

    const facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID ? process.env.FACEBOOK_CLIENT_ID : "259498987885158",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET ? process.env.FACEBOOK_CLIENT_SECRET : "dc26f181cd4577ae252303900ba93d39",
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL ? process.env.FACEBOOK_CALLBACK_URL : "/auth/facebook/callback"
    };

    console.log(facebookConfig);

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback', function(req,res,next) {
        // console.log("============", req);
        passport.authenticate(
            'facebook',
            {
                successRedirect:"/assignment/#/login",
                failureRedirect:"/assignment/#/login"
            }
        ) (req,res,next);
    });
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);

    function localStrategy(username, password, done) {
        UserModel
            .find({username: username, password: password})
            .then(function(users) {
                    if(users[0].username === username && users[0].password === password) {
                        return done(null, users[0]);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        UserModel
            .findByFacebookId(profile.id)
            .then(function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        const user = {facebook: {
                            id: profile.id,
                            token: token
                        }};
                        console.log(user);
                        UserModel
                            .create(user)
                            .then(function(user) {
                                console.log("user created");
                                return done(null, user);
                            }).catch(function(error) {
                                console.log(error);
                                return done(error, false);
                            });
                    }
                },
                function(err) {
                    if (err) { return done(err, false); }
                }
            );
    }

        function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        console.log("logout");
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        UserModel
            .create(user)
            .then(function(user){
                if(user) {
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }


}

module.exports = UserService;

