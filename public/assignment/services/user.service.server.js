/**
 * Created by DylanWight on 5/30/17.
 */

function UserService (app) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    const CommonService = require('./common.service.server');
    const UserModel = require("../model/user/user.model.server")();
    var UserService = new CommonService(app, UserModel, "user");

    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);

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


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


}

module.exports = UserService;

